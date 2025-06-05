export const prerender = true;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
          const { data } = matter(fileContents);
          
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
          
          return {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: formattedDate,
            category: data.category || '미분류',
            summary: data.summary || '',
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
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
        <description><![CDATA[${post.summary || ''}]]></description>
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