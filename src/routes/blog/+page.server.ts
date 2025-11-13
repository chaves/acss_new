import type { PageServerLoad } from './$types';
import { posts } from '$lib/api';

// ISR: Revalidate blog index every 5 minutes
export const config = {
	isr: {
		expiration: 300
	}
};

export const load = (async () => {
	try {
		const allPosts = await posts.getAll();
		return { posts: allPosts };
	} catch (error) {
		console.error('Error loading posts:', error);
		return { posts: [] };
	}
}) satisfies PageServerLoad;