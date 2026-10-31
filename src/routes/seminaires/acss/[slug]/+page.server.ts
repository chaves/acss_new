import type { PageServerLoad } from './$types';
import { allAcssSessions, acssEntries } from '#lib/server/acss-sessions.js';
import { error } from '@sveltejs/kit';
export const prerender = true;
export const entries = acssEntries;
export const load = (async ({ params }) => {
	const session = (await allAcssSessions()).find((session) => session.slug === params.slug);
	if (!session) error(404, 'Session not found');
	return { session };
}) satisfies PageServerLoad;
