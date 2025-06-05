import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 빌드 시 실행되는 함수
export async function generateSearchData() {
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
        
        // front matter 제외한 콘텐츠 정리
        const cleanContent = content
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<[^>]*>/g, ' ');
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title || filename.replace('.md', ''),
          date: formattedDate,
          category: data.category || '미분류',
          summary: data.summary || '',
          content: cleanContent.substring(0, 1000) // 콘텐츠 일부만 포함하여 파일 크기 제한
        };
      } catch (e) {
        console.error(`Error parsing ${filename}:`, e);
        return null;
      }
    })
    .filter(Boolean);
  
  // JSON 파일로 저장
  const outputDir = path.resolve('static');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'search-data.json'),
    JSON.stringify(posts)
  );
  
  console.log('Search data generated successfully!');
}