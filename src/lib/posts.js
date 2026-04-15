import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function findMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatPostDate(rawDate) {
  if (!rawDate) return 'Unknown';

  const date = new Date(rawDate);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }

  return rawDate;
}

function parsePostFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  const { data, content } = matter(fileContents);

  return {
    slug: filename.replace('.md', ''),
    title: data.title || filename.replace('.md', ''),
    date: formatPostDate(data.date),
    category: data.category || '미분류',
    summary: data.summary || '',
    content,
    filePath
  };
}

// 모든 게시물 데이터 가져오기 (연도별 하위 폴더 포함)
export async function getPosts() {
  const postsDirectory = path.resolve('src/posts');
  const markdownFiles = findMarkdownFiles(postsDirectory);
  
  const posts = markdownFiles
    .map((filePath) => {
      try {
        const { content, ...metadata } = parsePostFile(filePath);
        return metadata;
      } catch (e) {
        console.error(`Error parsing ${path.basename(filePath)}:`, e);
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

    return parsePostFile(filePath);
  } catch (e) {
    console.error(`Error getting post ${slug}:`, e);
    return null;
  }
}
