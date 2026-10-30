import type { PageServerLoad } from './$types';
import { authors } from '#lib/api/index.js';
import { error } from '@sveltejs/kit';

/**
 * Team member pages are prerendered at build time
 * Strapi changes reach them through the webhook that triggers a Vercel Deploy Hook rebuild
 */

/**
 * Generate entries for prerendering at build time
 * Only includes existing members from the API
 */
export async function entries() {
	try {
		const team = await authors.getTeam();
		const entries: Array<{ slug: string }> = [];

		for (const member of team) {
			const slug = (member as any).Slug || (member as any).slug;
			if (slug && typeof slug === 'string') {
				entries.push({ slug: slug.trim() });
			}
		}

		console.log(`[equipe/[slug]] Generated ${entries.length} team member entries`);
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
