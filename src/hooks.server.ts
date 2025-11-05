import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { locales, baseLocale, setLocale } from '$lib/paraglide/runtime';

const handleParaglide: Handle = async ({ event, resolve }) => {
	// Redirect root path to default language
	if (event.url.pathname === '/') {
		return new Response(null, {
			status: 302,
			headers: {
				location: `/${baseLocale}/`
			}
		});
	}

	// Get the language from the URL path
	const [, lang] = event.url.pathname.split('/');
	const languageTag = locales.includes(lang as any)
		? lang
		: baseLocale;

	// Set the locale for this request (Paraglide JS 2.0 uses request context)
	setLocale(languageTag as any);

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			// Replace placeholders in app.html
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
	const pathname = event.url.pathname;
	const isStaticAsset = 
		pathname.startsWith('/images/') ||
		pathname.startsWith('/files/') ||
		pathname.match(/^\/(en|fr)\/images\//) ||
		pathname.match(/^\/(en|fr)\/files\//) ||
		pathname.match(/\.(jpg|jpeg|png|webp|svg|woff|woff2|ttf|eot)$/);
	
	if (isStaticAsset) {
		// Cache images and fonts for 1 year
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else if (pathname.startsWith('/_app/') || pathname.includes('/_app/')) {
		// Cache built assets with hash for 1 year
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else {
		// Cache HTML pages with revalidation
		response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
	}

	return response;
};

export const handle: Handle = sequence(handleParaglide, handleHeaders);
