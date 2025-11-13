import type { PageServerLoad } from './$types';
import { authors } from '$lib/api';
import { error } from '@sveltejs/kit';

// ISR: Revalidate individual team member pages every 1 hour
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load = (async ({ params }) => {
	try {
		const membre = await authors.getBySlug(params.slug);

		if (!membre) {
			throw error(404, `Team member not found: ${params.slug}`);
		}

		return {
			membre: [membre]
		};
	} catch (err) {
		console.error('Error loading team member:', err);
		if ((err as any).status === 404) {
			throw err;
		}
		return { membre: [] };
	}
}) satisfies PageServerLoad;
