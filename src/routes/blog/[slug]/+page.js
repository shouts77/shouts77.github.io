import { getPosts } from '$lib/posts';

// prerender를 활성화하고 모든 가능한 경로를 생성
export const prerender = true;

export async function entries() {
    // 모든 포스트의 슬러그를 가져와서 prerender할 경로 목록 생성
    const posts = await getPosts();
    return posts.map(post => ({ slug: post.slug }));
}

export async function load({ params, parent }) {
    const parentData = await parent();
    
    try {
        const post = await import(`../../../posts/${params.slug}.md`);
        
        return {
            content: post.default,
            meta: parentData.meta,
            slug: params.slug
        };
    } catch (e) {
        console.error('Error loading post in client:', e);
        console.log('Attempted to load:', params.slug);
        return {
            content: null,
            meta: parentData.meta,
            slug: params.slug
        };
    }
}