import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://acss-dig.psl.eu/sitemap.xml

# Crawl-delay (optional, helps prevent server overload)
Crawl-delay: 1

# Disallow admin or sensitive paths (if any)
# Disallow: /admin/
# Disallow: /api/
`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
		}
	});
};

