import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // gray-matter를 사용하여 front matter 파싱

export async function load() {
    try {
        const postsDirectory = path.resolve('src/posts');
        const filenames = fs.readdirSync(postsDirectory);

        const summaries = filenames
            .filter((file) => file.endsWith('.md')) // .md 파일만 처리
            .map((filename) => {
                const filePath = path.join(postsDirectory, filename);
                const fileContents = fs.readFileSync(filePath, 'utf-8'); // 파일 내용 읽기
                const { data } = matter(fileContents); // front matter 파싱
                
                // 날짜 포맷팅 처리
                let formattedDate = 'Unknown';
                if (data.date) {
                    const date = new Date(data.date);
                    if (!isNaN(date.getTime())) {
                        formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
                    } else {
                        formattedDate = data.date; // 파싱 불가능한 경우 원본 값 사용
                    }
                }

                return {
                    slug: filename.replace('.md', ''), // 파일 이름에서 확장자 제거
                    title: data.title || 'Untitled',
                    date: formattedDate,
                    category: data.category || '미분류' // 카테고리 추가
                };
            });

        // 모든 고유 카테고리 목록 수집
        const categories = [...new Set(summaries.map(post => post.category))];

        return {
            summaries,
            categories // 카테고리 목록 전달
        };
    } catch (error) {
        console.error('Error in load function:', error); // 오류 출력
        throw error;
    }
}