import { getPosts } from '$lib/posts';

// prerender를 활성화하고 모든 가능한 경로를 생성
export const prerender = true;

export async function entries() {
    // 모든 포스트의 슬러그를 가져와서 prerender할 경로 목록 생성
    const posts = await getPosts();
    return posts.map(post => ({ slug: post.slug }));
}

async function findPostModule(slug) {
    // Vite의 glob import로 모든 연도별 폴더의 마크다운 파일들을 가져오기
    const allPosts = import.meta.glob('../../../posts/*/*.md');

    // 해당 slug와 일치하는 파일 찾기
    for (const [path, importFn] of Object.entries(allPosts)) {
        const filename = path.split('/').pop().replace('.md', '');
        if (filename === slug) {
            const post = await importFn();
            return post;
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