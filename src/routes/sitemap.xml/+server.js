import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { getPosts } from '$lib/posts';

export async function GET({ url }) {
  const posts = await getPosts();
  
  // GitHub Pages URL로 변경
  const baseUrl = 'https://shouts77.github.io';
  
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- 메인 페이지 -->
    <url>
      <loc>${baseUrl}/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    
    <!-- 블로그 목록 페이지 -->
    <url>
      <loc>${baseUrl}/blog</loc>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    
    <!-- 각 블로그 포스트 -->
    ${posts.map(post => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    `).join('')}
  </urlset>`.trim();
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}