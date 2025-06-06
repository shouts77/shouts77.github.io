import { getPosts } from '$lib/posts';

export async function load() {
    try {
        const summaries = await getPosts();
        
        // 모든 고유 카테고리 목록 수집
        const categories = [...new Set(summaries.map(post => post.category))];

        return {
            summaries,
            categories
        };
    } catch (error) {
        console.error('Error in load function:', error);
        throw error;
    }
}