import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';

const handleParaglide: Handle = i18n.handle();

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
