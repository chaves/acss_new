import type { PageServerLoad } from './$types';
import { authors } from '$lib/api';
import { error } from '@sveltejs/kit';

/**
 * Use ISR (Incremental Static Regeneration) for team member pages
 * Pages are prerendered at build time and revalidated via webhook when content changes
 */

/**
 * Generate entries for prerendering at build time
 * Gracefully handles deleted members by skipping invalid entries
 */
export async function entries() {
	try {
		const team = await authors.getTeam();
		const entries: Array<{ slug: string }> = [];

		for (const member of team) {
			const slug = (member as any).Slug || (member as any).slug;
			if (slug && typeof slug === 'string') {
				// Validate that member data exists before adding to entries
				try {
					const memberData = await authors.getBySlug(slug);
					if (memberData) {
						entries.push({ slug: slug.trim() });
					}
				} catch (err) {
					// Skip members that cause errors (deleted, invalid, etc.)
					console.warn(`Skipping team member ${slug} due to error:`, (err as any).message);
				}
			}
		}

		console.log(`[equipe/[slug]] Generated ${entries.length} valid team member entries`);
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
