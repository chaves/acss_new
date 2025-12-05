import type { PageServerLoad } from './$types';
import { authors } from '$lib/api';
import { error } from '@sveltejs/kit';

/**
 * Explicitly list all team member routes for prerendering
 * This ensures they are discovered at build time even if crawl misses them
 */
export async function entries() {
	try {
		const team = await authors.getTeam();
		const entries: Array<{ slug: string }> = [];

		// Generate entries for each team member slug
		for (const member of team) {
			// Handle both Slug (capital) and slug (lowercase) for compatibility
			const slug = (member as any).Slug || (member as any).slug;
			if (slug && typeof slug === 'string') {
				entries.push({ slug: slug.trim() });
			}
		}

		console.log(`[equipe/[slug]] Generated ${entries.length} team member entries for prerendering:`, entries.map(e => e.slug));
		return entries;
	} catch (err) {
		console.error('[equipe/[slug]] Error generating entries:', err);
		// Return empty array if API fails during build
		return [];
	}
}

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
