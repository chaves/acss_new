import type { PageServerLoad } from './$types';
import { posts } from '$lib/api';

// Blog content comes from Strapi and must be rendered per locale/request.
// Prerendering can permanently bake a transient CMS failure into one locale.
export const prerender = false;

export const load = (async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600'
	});

	const allPosts = await posts.getAll();
	return { posts: allPosts };
}) satisfies PageServerLoad;
