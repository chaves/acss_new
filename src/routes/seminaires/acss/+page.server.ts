import type { PageServerLoad } from './$types';
import { getAllSessions, getUpcomingSessions, getPastSessions } from '#lib/helpers/markdown.js';

export const load = (async ({ setHeaders }) => {
	// Cache on the Vercel CDN for 24 hours (86400 seconds); a Strapi webhook rebuild clears it sooner
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
