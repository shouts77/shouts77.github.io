import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

export async function GET({ url }) {
  const siteUrl = url.origin;
  const siteTitle = 'shoutslog';
  const siteDescription = 'SvelteKit으로 일상을 기록하는 공간';
  const postsDirectory = path.resolve('src/posts');
  const filenames = fs.readdirSync(postsDirectory);

  // 모든 블로그 포스트 정보 가져오기
  const posts = filenames
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      
      // 콘텐츠의 초반 부분을 발췌하여 요약으로 사용
      const excerpt = content
        .trim()
        .split('\n')
        .slice(0, 3)
        .join(' ')
        .substring(0, 200)
        .replace(/[<>&'"]/g, (c) => {
          switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
          }
        });
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date ? new Date(data.date) : new Date(),
        excerpt: excerpt + '...',
        formattedDate: data.date ? new Date(data.date).toUTCString() : new Date().toUTCString()
      };
    })
    .sort((a, b) => b.date - a.date); // 날짜 기준 내림차순 정렬

  // RSS XML 생성
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <description>${siteDescription}</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(post => `
    <item>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description>${post.excerpt}</description>
      <pubDate>${post.formattedDate}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}