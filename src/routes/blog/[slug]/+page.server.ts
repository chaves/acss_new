import type { PageServerLoad } from './$types';
import { posts, contentEntries } from '#lib/server/content.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = (async ({ params, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, must-revalidate'
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

export function entries() {
	return contentEntries('POST');
}
