import type { Reroute } from '@sveltejs/kit';
import { locales } from '$lib/paraglide/runtime';

export const reroute: Reroute = ({ url }) => {
	const pathname = url.pathname;

	// Handle language-prefixed static assets first (most specific check)
	if (pathname.match(/^\/(en|fr)\/(images|files)\//)) {
		// Strip language prefix: /fr/images/... → /images/...
		return pathname.replace(/^\/(en|fr)\//, '/');
	}

	// Don't reroute static assets without language prefix
	// Also exclude favicon files, manifest files, and other root assets
	if (
		pathname.startsWith('/_app/') ||
		pathname.startsWith('/images/') ||
		pathname.startsWith('/files/') ||
		pathname.startsWith('/api/') ||
		pathname.includes('/_app/') ||
		pathname.startsWith('/favicon') ||
		pathname.startsWith('/apple-touch-icon') ||
		pathname.startsWith('/site.webmanifest') ||
		pathname.startsWith('/browserconfig.xml') ||
		pathname.startsWith('/safari-pinned-tab.svg') ||
		pathname.startsWith('/robots.txt') ||
		pathname.startsWith('/sitemap.xml') ||
		pathname.match(/^\/.*\.(ico|png|svg|xml|webmanifest|txt)$/)
	) {
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
