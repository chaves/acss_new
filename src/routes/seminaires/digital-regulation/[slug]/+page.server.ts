import type { PageServerLoad } from './$types';
import { seminars, contentEntries } from '#lib/server/content.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = (async ({ params }) => {
	const seminar = await seminars.getBySlug(params.slug);

	if (!seminar || seminar.type !== 'digitalReg') {
		throw error(404, 'Seminar not found');
	}

	return { seminar };
}) satisfies PageServerLoad;

export function entries() {
	return contentEntries('SEMINAR', 'digitalReg');
}
