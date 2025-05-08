import { error } from '@sveltejs/kit';
import { posts } from '../../../posts/data.js';

export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);

	if (!post) error(404);

	return {
		post
	};
}