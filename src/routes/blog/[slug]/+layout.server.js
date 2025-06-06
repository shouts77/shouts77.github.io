import { error } from '@sveltejs/kit';
import { getPost } from '$lib/posts';

export async function load({ params }) {
    try {
        const post = await getPost(params.slug);
        
        if (!post) {
            throw error(404, `Post not found: ${params.slug}`);
        }
        
        return {
            slug: params.slug,
            meta: {
                title: post.title,
                date: post.date,
                category: post.category,
                summary: post.summary
            }
        };
    } catch (e) {
        console.error('Error loading post:', e);
        throw error(404, `Post not found: ${params.slug}`);
    }
}