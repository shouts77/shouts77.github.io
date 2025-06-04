import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 컨텍스트 추출 함수 수정
function extractContextForKeyword(text, keyword, contextLength = 40) {
    if (!text || !keyword || typeof text !== 'string') return '';
    
    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    const keywordIndex = lowerText.indexOf(lowerKeyword);
    
    if (keywordIndex === -1) return '';
    
    const startIndex = Math.max(0, keywordIndex - contextLength);
    const endIndex = Math.min(text.length, keywordIndex + keyword.length + contextLength);
    
    let context = text.substring(startIndex, endIndex);
    
    // 시작/끝에 있을 경우 생략 부호 추가
    if (startIndex > 0) context = '...' + context;
    if (endIndex < text.length) context = context + '...';
    
    return context;
}

export async function GET({ url }) {
    const query = url.searchParams.get('q')?.toLowerCase() || '';
    
    if (!query) {
        return json({ results: [] });
    }
    
    try {
        // 모든 포스트 가져오기
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
                        // 실제 마크다운 콘텐츠만 저장 (front matter 제외)
                        content: content,
                        // 원본 파일 내용도 저장
                        rawContent: fileContents
                    };
                } catch (e) {
                    console.error(`Error parsing ${filename}:`, e);
                    return null;
                }
            })
            .filter(Boolean);
        
        // 검색 필터링 및 컨텍스트 추가
        const results = posts.filter(post => {
            // 제목과 내용에서 검색
            const titleMatch = post.title.toLowerCase().includes(query);
            const contentMatch = post.content.toLowerCase().includes(query);
            const summaryMatch = post.summary.toLowerCase().includes(query);
            
            return titleMatch || contentMatch || summaryMatch;
        })
        .map(post => {
            // 검색 결과에 컨텍스트 추가
            let matchContext = '';
            
            // 1. 먼저 실제 마크다운 콘텐츠에서 검색 (front matter 제외)
            if (post.content && post.content.toLowerCase().includes(query)) {
                // HTML 태그 제거 (script 태그 등)
                const cleanContent = post.content
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/<[^>]*>/g, ' ');
                    
                matchContext = extractContextForKeyword(cleanContent, query, 60);
            }
            
            // 2. 실제 콘텐츠에서 찾지 못했으면 요약에서 찾기
            if (!matchContext && post.summary && post.summary.toLowerCase().includes(query)) {
                matchContext = extractContextForKeyword(post.summary, query, 60);
            }
            
            // 3. 그래도 못 찾았으면 원본 파일에서 찾지만, front matter 부분은 제외
            if (!matchContext && post.rawContent.toLowerCase().includes(query)) {
                // front matter 제거
                const contentWithoutFrontmatter = post.rawContent.replace(/---[\s\S]*?---/, '');
                // HTML 태그 제거
                const cleanContent = contentWithoutFrontmatter
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/<[^>]*>/g, ' ');
                
                matchContext = extractContextForKeyword(cleanContent, query, 60);
            }
            
            // 필요한 데이터만 반환
            const { content, rawContent, ...rest } = post;
            return {
                ...rest,
                matchContext
            };
        })
        .sort((a, b) => {
            // 날짜 기준 내림차순 정렬
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
        
        return json({ results });
    } catch (error) {
        console.error('Search error:', error);
        return json({ results: [], error: '검색 중 오류가 발생했습니다.' }, { status: 500 });
    }
}