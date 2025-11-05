import type { PageServerLoad } from './$types';
import { posts } from '$lib/api';

export const load = (async () => {
	try {
		const allPosts = await posts.getAll();
		return { posts: allPosts };
	} catch (error) {
		console.error('Error loading posts:', error);
		return { posts: [] };
	}
}) satisfies PageServerLoad;