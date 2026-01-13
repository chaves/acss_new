import type { PageServerLoad } from './$types';
import { posts, seminars } from '$lib/api';
import { getUpcomingSessions } from '$lib/helpers/markdown';

export const load = (async () => {
	try {
		// Run all API requests and markdown loading concurrently
		const [upcomingSeminars, recentPosts, acssSessions] = await Promise.all([
			seminars.getUpcoming(),
			posts.getRecent(5),
			Promise.resolve(getUpcomingSessions())
		]);

		return {
			seminars: upcomingSeminars,
			posts: recentPosts,
			upcomingAcssSession: acssSessions.length > 0 ? acssSessions[0] : null
		};
	} catch (error) {
		// Log the error for debugging
		console.error('Error loading homepage data:', error);
		// Return empty arrays in case of error
		return {
			seminars: [],
			posts: [],
			upcomingAcssSession: null
		};
	}
}) satisfies PageServerLoad;