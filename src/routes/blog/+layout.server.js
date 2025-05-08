import { posts } from '../../posts/data.js';

export function load() {
	return {
		summaries: posts.map((post) => ({
			slug: post.slug,
			title: post.title,
			date: post.date,
		}))
	};
}
