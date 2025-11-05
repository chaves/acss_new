import type { Reroute } from '@sveltejs/kit';
import { locales } from '$lib/paraglide/runtime';

export const reroute: Reroute = ({ url }) => {
	// Extract language from URL path
	const [, lang, ...rest] = url.pathname.split('/');

	// If the first segment is a valid language tag, remove it from the path
	if (locales.includes(lang as any)) {
		const newPath = '/' + rest.join('/');
		return newPath || '/';
	}

	// Otherwise, return the original path
	return url.pathname;
};
