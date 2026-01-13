import type { PageServerLoad } from './$types';
import { getAllSessions, getUpcomingSessions, getPastSessions } from '$lib/helpers/markdown';

export const load = (async () => {
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
