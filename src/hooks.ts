import type { Reroute } from '@sveltejs/kit';
import { locales } from '$lib/paraglide/runtime';

export const reroute: Reroute = ({ url }) => {
	const pathname = url.pathname;

	// Don't reroute static assets, built files, or API routes
	// Check both with and without potential language prefix
	if (
		pathname.startsWith('/_app/') ||
		pathname.startsWith('/images/') ||
		pathname.startsWith('/files/') ||
		pathname.startsWith('/api/') ||
		pathname.includes('/_app/') ||
		pathname.match(/^\/(en|fr)\/images\//) ||
		pathname.match(/^\/(en|fr)\/files\//)
	) {
		// For language-prefixed static assets, remove the language prefix
		const match = pathname.match(/^\/(en|fr)\/(images|files)\//);
		if (match) {
			return pathname.replace(/^\/(en|fr)\//, '/');
		}
		return pathname;
	}

	// Extract language from URL path
	const [, lang, ...rest] = pathname.split('/');

	// If the first segment is a valid language tag, remove it from the path
	if (locales.includes(lang as any)) {
		const newPath = '/' + rest.join('/');
		return newPath || '/';
	}

	// Otherwise, return the original path
	return pathname;
};
