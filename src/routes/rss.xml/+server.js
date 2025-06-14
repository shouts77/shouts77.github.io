export const prerender = true;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; // 이 줄 추가

// posts.js 파일 대신 직접 구현
async function getPosts() {
  try {
    const postsDirectory = path.resolve('src/posts');
    const filenames = fs.readdirSync(postsDirectory);
    
    const posts = filenames
      .filter((file) => file.endsWith('.md'))
      .map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        
        try {
          const { data, content } = matter(fileContents);
          
          // 날짜 포맷팅
          let formattedDate = 'Unknown';
          if (data.date) {
            const date = new Date(data.date);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0];
            } else {
              formattedDate = data.date;
            }
          }
          
          // 콘텐츠에서 HTML 태그 제거 및 요약 생성
          const cleanContent = content
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]*>/g, ' ')
            .trim();
          
          const excerpt = cleanContent.length > 200 
            ? cleanContent.substring(0, 200) + '...' 
            : cleanContent;
          
          return {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: formattedDate,
            category: data.category || '미분류',
            summary: data.summary || '',
            excerpt: excerpt,
            content: cleanContent // 전체 콘텐츠 추가
          };
        } catch (e) {
          console.error(`Error parsing ${filename}:`, e);
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return posts;
  } catch (error) {
    console.error('포스트 로드 중 오류 발생:', error);
    return [];
  }
}

export async function GET({ url }) {
  const posts = await getPosts();
  
  // GitHub Pages URL로 변경
  const baseUrl = 'https://shouts77.github.io';
  
  const xml = `
  <?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>Slog</title>
      <description>SvelteKit으로 만든 개인 블로그</description>
      <link>${baseUrl}</link>
      <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
      <pubDate>${new Date().toUTCString()}</pubDate>
      
      ${posts.map(post => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.summary || generateExcerpt(post.content) || ''}]]></description>
        <content:encoded><![CDATA[${processContentForRss(post.content)}]]></content:encoded>
      </item>
      `).join('')}
    </channel>
  </rss>`.trim();
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

// XML 특수 문자 이스케이프 함수
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 콘텐츠 발췌 함수 추가
function generateExcerpt(content, maxLength = 150) {
  if (!content) return '';
  
  // HTML 태그 제거 및 공백 정리
  const cleanText = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  if (cleanText.length <= maxLength) return cleanText;
  
  // 적절한 길이로 자르기
  const excerpt = cleanText.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  
  return lastSpace > maxLength * 0.8 
    ? excerpt.substring(0, lastSpace) + '...' 
    : excerpt + '...';
}

// RSS용 콘텐츠 처리 함수 개선
function processContentForRss(content) {
  if (!content) return '';
  
  // marked를 사용하여 마크다운을 HTML로 변환
  return marked(content, {
    gfm: true,        // GitHub Flavored Markdown 지원
    breaks: true,     // 줄바꿈 인식
    sanitize: false   // HTML 태그 허용
  });
}