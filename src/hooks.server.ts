import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { locales, baseLocale, setLocale, overwriteGetLocale } from '$lib/paraglide/runtime';

// Override getLocale to get locale from event locals
overwriteGetLocale(() => {
	// This will be set by the middleware
	return (globalThis as any).__PARAGLIDE_LOCALE__ || baseLocale;
});

const handleParaglide: Handle = async ({ event, resolve }) => {
	// Get the language from the URL path
	const [, lang] = event.url.pathname.split('/');
	const languageTag = locales.includes(lang as any)
		? lang
		: baseLocale;

	// Set the locale globally for this request
	(globalThis as any).__PARAGLIDE_LOCALE__ = languageTag;

	// Also set it using setLocale
	setLocale(languageTag as any);

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			// Replace placeholders in app.html
			// For now, using 'ltr' as default text direction (can be configured if needed)
			return html
				.replace('%lang%', languageTag)
				.replace('%textDirection%', 'ltr');
		}
	});
};

// Security and SEO headers
const handleHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Security headers
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=()'
	);

	// CORS headers for API endpoints
	if (event.url.pathname.startsWith('/api/')) {
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	}

	// Cache control headers for static assets
	if (event.url.pathname.startsWith('/images/') ||
	    event.url.pathname.startsWith('/files/') ||
	    event.url.pathname.match(/\.(jpg|jpeg|png|webp|svg|woff|woff2|ttf|eot)$/)) {
		// Cache images and fonts for 1 year
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else if (event.url.pathname.startsWith('/_app/')) {
		// Cache built assets with hash for 1 year
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else {
		// Cache HTML pages with revalidation
		response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
	}

	return response;
};

export const handle: Handle = sequence(handleParaglide, handleHeaders);
