import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateSearchData() {
  try {
    const postsDirectory = path.resolve('src/posts');
    if (!fs.existsSync(postsDirectory)) {
      throw new Error(`포스트 디렉토리가 존재하지 않습니다: ${postsDirectory}`);
    }

    function findMarkdownFiles(dir) {
      const files = [];
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // 하위 디렉토리의 파일들도 재귀적으로 탐색
          files.push(...findMarkdownFiles(fullPath));
        } else if (item.endsWith('.md')) {
          files.push(fullPath);
        }
      }
      
      return files;
    }

    const filePaths = findMarkdownFiles(postsDirectory);
    const posts = filePaths
      .map((filePath) => {
        const filename = path.basename(filePath);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        
        try {
          const { data, content } = matter(fileContents);
          let formattedDate = 'Unknown';
          let year = 'unknown';
          if (data.date) {
            const date = new Date(data.date);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0];
              year = date.getFullYear().toString();
            } else {
              formattedDate = data.date;
              if (data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                year = data.date.substring(0, 4);
              }
            }
          }

          const cleanContent = content
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]*>/g, ' ');

          const postData = {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: formattedDate,
            year,
            category: data.category || '미분류',
            summary: data.summary || '',
            content: cleanContent
          };
          return postData;
        } catch (e) {
          return null;
        }
      })
      .filter(Boolean);

    const outputDir = path.resolve('static');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'search-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

    return outputPath;
  } catch (error) {
    console.error('검색 데이터 생성 중 오류 발생:', error);
    throw error;
  }
}

if (import.meta.url === import.meta.main) {
  generateSearchData().catch(err => {
    console.error('최상위 오류:', err);
    process.exit(1);
  });
}
