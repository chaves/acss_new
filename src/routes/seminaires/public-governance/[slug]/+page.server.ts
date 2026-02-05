import type { PageServerLoad } from './$types';
import { seminars } from '$lib/api';
import { error } from '@sveltejs/kit';

// Disable prerendering for dynamic seminar pages (data comes from CMS)
export const prerender = false;

export const load = (async ({ params }) => {
	const seminar = await seminars.getBySlug(params.slug);

	if (!seminar || seminar.type !== 'pub') {
		throw error(404, 'Seminar not found');
	}

	return { seminar };
}) satisfies PageServerLoad;
