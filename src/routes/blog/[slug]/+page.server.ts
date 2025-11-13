import type { PageServerLoad } from './$types';
import { posts } from '$lib/api';
import { error } from '@sveltejs/kit';

// ISR: Revalidate individual blog posts every 1 hour
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load = (async ({ params }) => {
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
		return { post: [] };
	}
}) satisfies PageServerLoad;
