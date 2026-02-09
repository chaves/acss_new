import type { PageServerLoad } from './$types';
import { seminars } from '$lib/api';

export const load = (async ({ setHeaders }) => {
	// Enable ISR with 24-hour revalidation (86400 seconds)
	// This ensures the page is regenerated at least once per day
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400'
	});

	try {
		// Use start of today so seminars remain "upcoming" for the entire day
		const todayDate = new Date();
		todayDate.setHours(0, 0, 0, 0);
		const today = todayDate.toISOString();

		// Run both requests concurrently
		const [seminars_upcoming, seminars_past] = await Promise.all([
			seminars.getAll({
				filters: {
					type: 'pub',
					date: { $gte: today }
				},
				sort: 'date:asc'
			}),
			seminars.getAll({
				filters: {
					type: 'pub',
					date: { $lt: today }
				},
				sort: 'date:desc'
			})
		]);

		return {
			seminars_upcoming,
			seminars_past
		};
	} catch (error) {
		console.error('Error loading public governance seminars:', error);
		return {
			seminars_upcoming: [],
			seminars_past: []
		};
	}
}) satisfies PageServerLoad;
