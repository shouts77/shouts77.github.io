import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateSearchData() {
  try {
    console.log('검색 데이터 생성 시작...');
    
    // 포스트 디렉토리 경로
    const postsDirectory = path.resolve('src/posts');
    console.log(`포스트 디렉토리: ${postsDirectory}`);
    console.log(`디렉토리 존재 여부: ${fs.existsSync(postsDirectory)}`);
    
    if (!fs.existsSync(postsDirectory)) {
      console.error(`오류: 포스트 디렉토리가 존재하지 않습니다: ${postsDirectory}`);
      return;
    }
    
    // 파일 목록 가져오기
    const filenames = fs.readdirSync(postsDirectory);
    console.log(`총 ${filenames.length}개 파일 발견: ${filenames.join(', ')}`);
    
    // 마크다운 파일만 필터링 및 처리
    const posts = filenames
      .filter((file) => file.endsWith('.md'))
      .map((filename) => {
        console.log(`처리 중: ${filename}`);
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        
        try {
          const { data, content } = matter(fileContents);
          console.log(`${filename} frontmatter:`, data); // 파싱된 frontmatter 출력
          
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
          
          console.log(`${filename}: 콘텐츠 길이 ${cleanContent.length}자`);
          
          const postData = {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: formattedDate,
            year,
            category: data.category || '미분류',
            summary: data.summary || '',
            content: cleanContent
          };
          
          console.log(`${filename} 요약: "${postData.summary}"`);
          return postData;
        } catch (e) {
          console.error(`${filename} 처리 중 오류 발생:`, e);
          return null;
        }
      })
      .filter(Boolean);
    
    console.log(`${posts.length}개 포스트 처리 완료`);
    
    // 출력 디렉토리 준비
    const outputDir = path.resolve('static');
    console.log(`출력 디렉토리: ${outputDir}`);
    console.log(`디렉토리 존재 여부: ${fs.existsSync(outputDir)}`);
    
    if (!fs.existsSync(outputDir)) {
      console.log(`출력 디렉토리 생성: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 검색 데이터 파일 저장
    const outputPath = path.join(outputDir, 'search-data.json');
    console.log(`검색 데이터 파일 경로: ${outputPath}`);
    
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
    
    // 파일 크기 확인
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`검색 데이터 파일 생성 완료: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.error(`오류: 파일이 생성되지 않았습니다: ${outputPath}`);
    }
  } catch (error) {
    console.error('검색 데이터 생성 중 오류 발생:', error);
  }
}

// 스크립트가 직접 실행될 때 함수 호출
if (import.meta.url === import.meta.main) {
  console.log('스크립트 직접 실행 감지');
  generateSearchData().catch(err => {
    console.error('최상위 오류:', err);
    process.exit(1);
  });
} else {
  console.log('모듈로 임포트됨');
}