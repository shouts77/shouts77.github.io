import { getPosts } from '$lib/posts';

// prerender를 활성화하고 모든 가능한 경로를 생성
export const prerender = true;

export async function entries() {
    // 모든 포스트의 슬러그를 가져와서 prerender할 경로 목록 생성
    const posts = await getPosts();
    return posts.map(post => ({ slug: post.slug }));
}

async function findPostModule(slug) {
    // 연도별 폴더에서 파일 찾기
    const years = ['2025']; // 필요시 연도 추가
    
    for (const year of years) {
        try {
            const post = await import(`../../../posts/${year}/${slug}.md`);
            return post;
        } catch (e) {
            // 해당 연도 폴더에 파일이 없으면 다음 연도 시도
            continue;
        }
    }
    
    // 연도별 폴더에서 찾지 못한 경우 루트에서 시도 (하위 호환성)
    try {
        const post = await import(`../../../posts/${slug}.md`);
        return post;
    } catch (e) {
        throw new Error(`Post not found: ${slug}`);
    }
}

export async function load({ params, parent }) {
    const parentData = await parent();
    
    try {
        const post = await findPostModule(params.slug);
        
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