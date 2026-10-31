import type { PageServerLoad } from './$types';
import { seminars } from '#lib/server/content.js';
import { todayInParis } from '#lib/server/content-query.js';

export const prerender = true;

export const load = (async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, must-revalidate'
	});

	try {
		// Use start of today so seminars remain "upcoming" for the entire day
		const today = todayInParis();

		// Run both requests concurrently
		const [seminars_upcoming, seminars_past] = await Promise.all([
			seminars.getAll({
				filters: {
					type: 'nlp',
					date: { $gte: today }
				},
				sort: 'date:asc'
			}),
			seminars.getAll({
				filters: {
					type: 'nlp',
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
		console.error('Error loading NLP seminars:', error);
		return {
			seminars_upcoming: [],
			seminars_past: []
		};
	}
}) satisfies PageServerLoad;
