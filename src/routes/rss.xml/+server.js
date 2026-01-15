export const prerender = true;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; // 이 줄 추가

// posts는 공통 라이브러리에서 가져옵니다.
import { getPosts as getPostsMeta, getPost } from '$lib/posts';

async function getPosts() {
  try {
    const metaList = await getPostsMeta();
    // 각 포스트의 콘텐츠를 함께 가져옵니다.
    const posts = await Promise.all(metaList.map(async (meta) => {
      const full = await getPost(meta.slug);
      return {
        slug: meta.slug,
        title: meta.title,
        date: meta.date,
        category: meta.category,
        summary: meta.summary,
        content: full ? full.content : ''
      };
    }));
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

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
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
      <pubDate>${formatDateForRss(post.date)}</pubDate>
      <description><![CDATA[${post.summary || generateExcerpt(post.content) || ''}]]></description>
      <content:encoded><![CDATA[${processContentForRss(post.content)}]]></content:encoded>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

// XML 특수 문자 이스케이프 함수
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'\"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 날짜 포맷팅 안전 처리
function formatDateForRss(date) {
  const d = new Date(date);
  return !isNaN(d.getTime()) ? d.toUTCString() : new Date().toUTCString();
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