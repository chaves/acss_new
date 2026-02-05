import type { PageServerLoad } from './$types';
import { posts, seminars } from '$lib/api';
import { getUpcomingSessions } from '$lib/helpers/markdown';

export const load = (async () => {
	try {
		// Run all API requests and markdown loading concurrently
		const [upcomingSeminars, recentPosts, acssSessions] = await Promise.all([
			seminars.getUpcoming(5),
			posts.getRecent(5),
			Promise.resolve(getUpcomingSessions())
		]);

		// Find the next upcoming seminar across all categories
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Combine all upcoming seminars with normalized structure
		const allUpcoming: Array<{
			type: 'acss' | 'nlp' | 'pub';
			date: Date;
			data: any;
		}> = [];

		// Add ACSS sessions
		for (const session of acssSessions) {
			const sessionDate = new Date(session.frontmatter.date);
			if (sessionDate >= today) {
				allUpcoming.push({
					type: 'acss',
					date: sessionDate,
					data: session
				});
			}
		}

		// Add NLP and Public Governance seminars from Strapi
		for (const seminar of upcomingSeminars) {
			const seminarDate = new Date(seminar.date);
			if (seminarDate >= today) {
				allUpcoming.push({
					type: seminar.type as 'nlp' | 'pub',
					date: seminarDate,
					data: seminar
				});
			}
		}

		// Sort by date ascending and get the first one
		allUpcoming.sort((a, b) => a.date.getTime() - b.date.getTime());
		const nextSeminar = allUpcoming.length > 0 ? allUpcoming[0] : null;

		// Filter out the next seminar from the seminars list to avoid duplication
		// Only filter if nextSeminar is not ACSS (since seminars list only contains NLP and Public Governance)
		const filteredSeminars = nextSeminar && nextSeminar.type !== 'acss'
			? upcomingSeminars.filter(s => s.id !== nextSeminar.data.id)
			: upcomingSeminars;

		return {
			seminars: filteredSeminars,
			posts: recentPosts,
			nextSeminar
		};
	} catch (error) {
		// Log the error for debugging
		console.error('Error loading homepage data:', error);
		// Return empty arrays in case of error
		return {
			seminars: [],
			posts: [],
			nextSeminar: null
		};
	}
}) satisfies PageServerLoad;