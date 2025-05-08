export async function load({ data }) {
    try {
        const post = await import(`../../../posts/${data.slug}.md`);
        
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