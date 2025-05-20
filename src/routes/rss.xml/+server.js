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
      
      // HTML 태그를 제거하는 함수 (모든 HTML 태그)
      const removeHtmlTags = (content) => {
        // 모든 HTML 태그 제거 (마크다운 본문만 남김)
        return content.replace(/<\/?[^>]+(>|$)/g, '');
      };
      
      // HTML 태그 제거
      const cleanContent = removeHtmlTags(content);
      
      // 콘텐츠의 초반 부분을 발췌하여 요약으로 사용
      const excerpt = cleanContent
        .trim()
        .split('\n')
        .filter(line => line.trim() !== '') // 빈 줄 제거
        .slice(0, 5) // 처음 5개 비어있지 않은 줄 선택
        .join(' ')
        .substring(0, 300) // 최대 300자
        .replace(/[<>&'"]/g, (c) => {
          switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
          }
        }) + '...'; // 끝에 ... 추가
      
      // 날짜 처리
      let postDate;
      try {
        postDate = data.date ? new Date(data.date) : new Date();
        // 날짜가 유효하지 않으면 현재 날짜 사용
        if (isNaN(postDate.getTime())) postDate = new Date();
      } catch (e) {
        postDate = new Date();
      }
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title || 'Untitled',
        date: postDate,
        excerpt: excerpt,
        formattedDate: postDate.toUTCString()
      };
    })
    .sort((a, b) => b.date - a.date); // 날짜 기준 내림차순 정렬

  // RSS XML 생성 - 각 항목에 CDATA 사용 
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
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${post.formattedDate}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}