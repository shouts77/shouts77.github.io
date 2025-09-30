export async function load({ data }) {
    try {
        // 연도별 폴더에서 파일 찾기
        const years = ['2025']; // 필요시 연도 추가
        let post = null;
        
        for (const year of years) {
            try {
                post = await import(`../../../posts/${year}/${data.slug}.md`);
                break;
            } catch (e) {
                continue;
            }
        }
        
        // 연도별 폴더에서 찾지 못한 경우 루트에서 시도
        if (!post) {
            post = await import(`../../../posts/${data.slug}.md`);
        }
        
        return {
            content: post.default,
            meta: data.meta
        };
    } catch (e) {
        console.error('Error loading post in client:', e);
        console.log('Attempted to load:', data.slug);
        return {
            content: null,
            meta: data.meta
        };
    }
}