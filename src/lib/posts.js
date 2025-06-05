import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 모든 게시물 데이터 가져오기
export async function getPosts() {
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
}

// 특정 게시물 데이터 가져오기
export async function getPost(slug) {
  const postsDirectory = path.resolve('src/posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  try {
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