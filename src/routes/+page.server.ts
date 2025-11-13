import type { PageServerLoad } from './$types';
import { posts, seminars } from '$lib/api';

// ISR: Revalidate homepage every 60 seconds
export const config = {
	isr: {
		expiration: 60
	}
};

export const load = (async () => {
	try {
		// Run both API requests concurrently
		const [upcomingSeminars, recentPosts] = await Promise.all([
			seminars.getUpcoming(),
			posts.getRecent(10)
		]);

		return {
			seminars: upcomingSeminars,
			posts: recentPosts
		};
	} catch (error) {
		// Log the error for debugging
		console.error('Error loading homepage data:', error);
		// Return empty arrays in case of error
		return {
			seminars: [],
			posts: []
		};
	}
}) satisfies PageServerLoad;