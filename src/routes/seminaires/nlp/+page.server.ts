import type { PageServerLoad } from './$types';
import { seminars } from '$lib/api';

// ISR: Revalidate seminar pages every 10 minutes (seminars change frequently)
export const config = {
	isr: {
		expiration: 600
	}
};

export const load = (async () => {
	try {
		const today = new Date().toISOString();

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
