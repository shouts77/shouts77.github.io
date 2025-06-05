import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateSearchData() {
  try {
    const postsDirectory = path.resolve('src/posts');
    const filenames = fs.readdirSync(postsDirectory);
    
    console.log(`총 ${filenames.length}개 포스트 파일 발견`);
    
    // 모든 포스트 로드
    const posts = filenames
      .filter((file) => file.endsWith('.md'))
      .map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        
        try {
          const { data, content } = matter(fileContents);
          
          // 날짜 포맷팅
          let formattedDate = 'Unknown';
          let year = 'unknown';
          if (data.date) {
            const date = new Date(data.date);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0];
              year = date.getFullYear().toString();
            } else {
              formattedDate = data.date;
              // 날짜 형식(예: 2025-05-20)에서 연도 추출
              if (data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                year = data.date.substring(0, 4);
              }
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
            year,
            category: data.category || '미분류',
            summary: data.summary || '',
            // 콘텐츠 전체 포함 (content 제한 없음)
            content: cleanContent
          };
        } catch (e) {
          console.error(`Error parsing ${filename}:`, e);
          return null;
        }
      })
      .filter(Boolean);
    
    const outputDir = path.resolve('static/search-data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 1. 카테고리별 분할
    const categories = [...new Set(posts.map(post => post.category))];
    
    // 카테고리별 데이터 파일 생성
    categories.forEach(category => {
      const categoryPosts = posts.filter(post => post.category === category);
      fs.writeFileSync(
        path.join(outputDir, `category-${category}.json`),
        JSON.stringify(categoryPosts)
      );
      console.log(`카테고리 '${category}' 데이터 생성: ${categoryPosts.length}개 포스트`);
    });
    
    // 2. 연도별 분할
    const years = [...new Set(posts.map(post => post.year))];
    
    // 연도별 데이터 파일 생성
    years.forEach(year => {
      const yearPosts = posts.filter(post => post.year === year);
      fs.writeFileSync(
        path.join(outputDir, `year-${year}.json`),
        JSON.stringify(yearPosts)
      );
      console.log(`연도 '${year}' 데이터 생성: ${yearPosts.length}개 포스트`);
    });
    
    // 3. 색인 파일 생성 (메타데이터만 포함)
    const indexData = posts.map(post => {
      // 콘텐츠 없이 기본 정보만 포함
      const { content, ...metadata } = post;
      return metadata;
    });
    
    fs.writeFileSync(
      path.join(outputDir, `index.json`),
      JSON.stringify(indexData)
    );
    console.log(`색인 파일 생성: ${indexData.length}개 포스트 메타데이터`);
    
    // 4. 레거시 지원을 위한 전체 데이터 파일 (기존 방식 유지)
    fs.writeFileSync(
      path.join(outputDir, '..', 'search-data.json'),
      JSON.stringify(posts)
    );
    console.log(`전체 검색 데이터 생성 완료: ${posts.length}개 포스트`);
    
    // 파일 크기 정보 출력
    const indexSize = (fs.statSync(path.join(outputDir, 'index.json')).size / 1024).toFixed(2);
    const fullSize = (fs.statSync(path.join(outputDir, '..', 'search-data.json')).size / 1024).toFixed(2);
    console.log(`색인 파일 크기: ${indexSize} KB, 전체 데이터 파일 크기: ${fullSize} KB`);
    
  } catch (error) {
    console.error('검색 데이터 생성 중 오류 발생:', error);
  }
}

// 스크립트가 직접 실행될 때 함수 호출
if (import.meta.url === import.meta.main) {
  generateSearchData();
}