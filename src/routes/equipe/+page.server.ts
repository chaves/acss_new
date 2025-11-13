import type { PageServerLoad } from './$types';
import { authors } from '$lib/api';

// ISR: Revalidate team page every 30 minutes (team changes infrequently)
export const config = {
	isr: {
		expiration: 1800
	}
};

export const load = (async () => {
	try {
		const team = await authors.getTeam();
		return { equipe: team };
	} catch (error) {
		console.error('Error loading team:', error);
		return { equipe: [] };
	}
}) satisfies PageServerLoad;