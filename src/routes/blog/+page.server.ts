import type { PageServerLoad } from './$types';
import { posts } from '#lib/server/content.js';

export const prerender = true;

export const load = (async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, must-revalidate'
	});

	const allPosts = await posts.getAll();
	return { posts: allPosts };
}) satisfies PageServerLoad;
