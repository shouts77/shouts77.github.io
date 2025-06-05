import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateSearchData() {
  try {
    console.log('검색 데이터 생성 시작...');
    
    // 포스트 디렉토리 경로
    const postsDirectory = path.resolve('src/posts');
    console.log(`포스트 디렉토리: ${postsDirectory}`);
    
    // 디렉토리 존재 확인
    if (!fs.existsSync(postsDirectory)) {
      console.error(`오류: 포스트 디렉토리가 존재하지 않습니다: ${postsDirectory}`);
      return;
    }
    
    // 파일 목록 가져오기
    const filenames = fs.readdirSync(postsDirectory);
    console.log(`총 ${filenames.length}개 파일 발견`);
    
    // 마크다운 파일만 필터링 및 처리
    const posts = filenames
      .filter((file) => file.endsWith('.md'))
      .map((filename) => {
        console.log(`처리 중: ${filename}`);
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
          
          console.log(`${filename}: 콘텐츠 길이 ${cleanContent.length}자`);
          
          return {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: formattedDate,
            year,
            category: data.category || '미분류',
            summary: data.summary || '',
            content: cleanContent
          };
        } catch (e) {
          console.error(`${filename} 처리 중 오류 발생:`, e);
          return null;
        }
      })
      .filter(Boolean);
    
    console.log(`${posts.length}개 포스트 처리 완료`);
    
    // 출력 디렉토리 준비
    const outputDir = path.resolve('static');
    if (!fs.existsSync(outputDir)) {
      console.log(`출력 디렉토리 생성: ${outputDir}`);
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 검색 데이터 파일 저장
    const outputPath = path.join(outputDir, 'search-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(posts));
    
    // 파일 크기 확인
    const stats = fs.statSync(outputPath);
    console.log(`검색 데이터 파일 생성 완료: ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
  } catch (error) {
    console.error('검색 데이터 생성 중 오류 발생:', error);
    throw error; // 오류를 다시 던져서 빌드 프로세스가 실패하도록 함
  }
}

// 스크립트가 직접 실행될 때 함수 호출
if (import.meta.url === import.meta.main) {
  generateSearchData().catch(err => {
    console.error('최상위 오류:', err);
    process.exit(1);
  });
}