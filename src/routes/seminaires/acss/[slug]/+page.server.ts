import type { PageServerLoad } from './$types';
import { getSessionBySlug, getAllSessions } from '$lib/helpers/markdown';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const session = getSessionBySlug(params.slug);

	if (!session) {
		throw error(404, `Session not found: ${params.slug}`);
	}

	return {
		session
	};
}) satisfies PageServerLoad;

// Enable prerendering for all session pages
export const prerender = true;

// Generate static paths for all sessions at build time
export function entries() {
	const sessions = getAllSessions();
	return sessions.map((session) => ({
		slug: session.slug
	}));
}
