import type { PageServerLoad } from './$types';
import { getAllSessions, getUpcomingSessions, getPastSessions } from '$lib/helpers/markdown';

export const load = (async ({ setHeaders }) => {
	// Enable ISR with 24-hour revalidation (86400 seconds)
	// This ensures the page is regenerated at least once per day
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400'
	});

	try {
		const upcomingSessions = getUpcomingSessions();
		const pastSessions = getPastSessions();

		return {
			upcomingSessions,
			pastSessions
		};
	} catch (error) {
		console.error('Error loading sessions:', error);
		return {
			upcomingSessions: [],
			pastSessions: []
		};
	}
}) satisfies PageServerLoad;

// Enable prerendering
export const prerender = true;
