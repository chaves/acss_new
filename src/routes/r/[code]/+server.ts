import type { RequestHandler } from './$types';

export const prerender = false;

const headers = {
	'Cache-Control': 'private, no-store',
	'X-Robots-Tag': 'noindex, nofollow, noarchive'
};

export const GET: RequestHandler = ({ params }) => {
	const env = process.env;
	const target = env.ACSS_POLL_REDIRECT_URL;
	if (!env.ACSS_POLL_REDIRECT_CODE || params.code !== env.ACSS_POLL_REDIRECT_CODE || !target) {
		return new Response(null, { status: 404, headers });
	}

	// Only the configured Outlook poll can be reached; request parameters are ignored.
	try {
		const url = new URL(target);
		if (
			url.origin !== 'https://outlook.office.com' ||
			url.pathname !== '/findtime/vote' ||
			url.username ||
			url.password ||
			!url.searchParams.get('getrequesturl')
		) {
			return new Response(null, { status: 404, headers });
		}
	} catch {
		return new Response(null, { status: 404, headers });
	}

	// Preserve the original string, including the nested URL's percent encoding.
	return new Response(null, { status: 302, headers: { ...headers, Location: target } });
};
