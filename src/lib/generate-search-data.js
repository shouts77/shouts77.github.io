import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateSearchData() {
  try {
    const postsDirectory = path.resolve('src/posts');
    const filenames = fs.readdirSync(postsDirectory);
    
    console.log(`총 ${filenames.length}개 포스트 파일 발견`);
    
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
          
          console.log(`포스트 파싱: ${filename} (내용 길이: ${cleanContent.length}자)`);
          
          return {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: formattedDate,
            category: data.category || '미분류',
            summary: data.summary || '',
            // 전체 내용 포함 (제한 없음)
            content: cleanContent
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
    
    console.log(`검색 데이터 생성 완료: ${posts.length}개 포스트, 파일 크기: ${
      (fs.statSync(path.join(outputDir, 'search-data.json')).size / 1024).toFixed(2)
    } KB`);
  } catch (error) {
    console.error('검색 데이터 생성 중 오류 발생:', error);
  }
}

// 스크립트가 직접 실행될 때 함수 호출
if (import.meta.url === import.meta.main) {
  generateSearchData();
}