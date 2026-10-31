import type { PageServerLoad } from './$types';
import { authors } from '#lib/server/content.js';

export const prerender = true;

export const load = (async () => {
	try {
		const team = await authors.getTeam();
		return { equipe: team };
	} catch (error) {
		console.error('Error loading team:', error);
		return { equipe: [] };
	}
}) satisfies PageServerLoad;
