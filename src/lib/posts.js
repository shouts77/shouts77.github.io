import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 모든 게시물 데이터 가져오기 (연도별 하위 폴더 포함)
export async function getPosts() {
  const postsDirectory = path.resolve('src/posts');
  
  // 모든 마크다운 파일을 재귀적으로 찾기
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
  
  const markdownFiles = findMarkdownFiles(postsDirectory);
  
  const posts = markdownFiles
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const filename = path.basename(filePath);
      
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
        
        return {
          slug: filename.replace('.md', ''),
          title: data.title || filename.replace('.md', ''),
          date: formattedDate,
          category: data.category || '미분류',
          summary: data.summary || '',
          filePath: filePath, // 전체 파일 경로 저장
        };
      } catch (e) {
        console.error(`Error parsing ${filename}:`, e);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return posts;
}

// 특정 게시물 데이터 가져오기 (연도별 하위 폴더 포함)
export async function getPost(slug) {
  const postsDirectory = path.resolve('src/posts');
  
  // 연도별 폴더에서 파일 찾기
  function findPostFile(dir, targetSlug) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 하위 디렉토리에서 재귀적으로 찾기
        const found = findPostFile(fullPath, targetSlug);
        if (found) return found;
      } else if (item === `${targetSlug}.md`) {
        return fullPath;
      }
    }
    
    return null;
  }
  
  try {
    const filePath = findPostFile(postsDirectory, slug);
    
    if (!filePath) {
      console.error(`Post file not found: ${slug}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf-8');
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
    
    return {
      slug,
      title: data.title || slug,
      date: formattedDate,
      category: data.category || '미분류',
      summary: data.summary || '',
      content
    };
  } catch (e) {
    console.error(`Error getting post ${slug}:`, e);
    return null;
  }
}