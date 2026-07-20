import type { PageServerLoad } from './$types';
import { posts } from '$lib/api';
import { error } from '@sveltejs/kit';

// Keep the request locale available to Paraglide when rendering CMS pages.
export const prerender = false;

export const load = (async ({ params, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600'
	});

	try {
		const post = await posts.getBySlug(params.slug);

		if (!post) {
			throw error(404, `Post not found: ${params.slug}`);
		}

		return { post: [post] };
	} catch (err) {
		console.error('Error loading post:', err);
		if ((err as any).status === 404) {
			throw err;
		}
		throw err;
	}
}) satisfies PageServerLoad;
