import type { RequestHandler } from './$types';

const BASE_URL = 'https://acss-dig.psl.eu';

// Static pages with their priorities and change frequencies
const staticPages = [
	{ url: '/', changefreq: 'weekly', priority: 1.0 },
	{ url: '/mission', changefreq: 'monthly', priority: 0.8 },
	{ url: '/plateforme', changefreq: 'monthly', priority: 0.8 },
	{ url: '/partenariats', changefreq: 'monthly', priority: 0.7 },
	{ url: '/formation', changefreq: 'monthly', priority: 0.7 },
	{ url: '/formation/hackathon_2022', changefreq: 'yearly', priority: 0.5 },
	{ url: '/formation/psl_week_2022', changefreq: 'yearly', priority: 0.5 },
	{ url: '/blog', changefreq: 'daily', priority: 0.9 },
	{ url: '/membres', changefreq: 'monthly', priority: 0.8 },
	{ url: '/equipe', changefreq: 'monthly', priority: 0.8 },
	{ url: '/seminaires', changefreq: 'weekly', priority: 0.9 },
	{ url: '/seminaires/acss', changefreq: 'weekly', priority: 0.9 },
	{ url: '/seminaires/nlp', changefreq: 'weekly', priority: 0.8 },
	{ url: '/seminaires/public-governance', changefreq: 'weekly', priority: 0.8 },
	{ url: '/donnees/credit_series', changefreq: 'yearly', priority: 0.6 }
];

// Languages to generate URLs for
const languages = ['en', 'fr'];

async function fetchDynamicPages() {
	const source = 'https://cms.acss-psl.eu/api/';
	const dynamicPages: Array<{ url: string; changefreq: string; priority: number; lastmod?: string }> = [];

	try {
		// Fetch blog posts
		const postsRes = await fetch(`${source}posts?pagination[pageSize]=100&sort=publishedAt:desc`);
		if (postsRes.ok) {
			const postsData = await postsRes.json();
			postsData.data.forEach((post: any) => {
				dynamicPages.push({
					url: `/blog/${post.Slug}`,
					changefreq: 'monthly',
					priority: 0.7,
					lastmod: post.updatedAt || post.publishedAt
				});
			});
		}

		// Fetch members
		const membersRes = await fetch(`${source}membres?pagination[pageSize]=100`);
		if (membersRes.ok) {
			const membersData = await membersRes.json();
			membersData.data.forEach((member: any) => {
				dynamicPages.push({
					url: `/membres/${member.Slug}`,
					changefreq: 'monthly',
					priority: 0.6,
					lastmod: member.updatedAt
				});
			});
		}

		// Fetch team members
		const teamRes = await fetch(`${source}equipes?pagination[pageSize]=100`);
		if (teamRes.ok) {
			const teamData = await teamRes.json();
			teamData.data.forEach((member: any) => {
				dynamicPages.push({
					url: `/equipe/${member.Slug}`,
					changefreq: 'monthly',
					priority: 0.6,
					lastmod: member.updatedAt
				});
			});
		}
	} catch (error) {
		console.error('Error fetching dynamic pages for sitemap:', error);
	}

	return dynamicPages;
}

function generateSitemap(pages: Array<{ url: string; changefreq: string; priority: number; lastmod?: string }>) {
	// Generate URLs for each page in each language
	const urlEntries = pages.map((page) => {
		const lastmod = page.lastmod ? `\n    <lastmod>${new Date(page.lastmod).toISOString()}</lastmod>` : '';

		// Generate language-specific URLs
		const langUrls = languages.map((lang) => `${BASE_URL}/${lang}${page.url}`);

		// Build alternate links for each language
		const alternates = languages
			.map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}/${lang}${page.url}" />`)
			.join('\n');

		// Create URL entry for each language variant
		return langUrls.map((url, idx) => `  <url>
    <loc>${url}</loc>${lastmod}
${alternates}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');
	}).join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

export const GET: RequestHandler = async () => {
	const dynamicPages = await fetchDynamicPages();
	const allPages = [...staticPages, ...dynamicPages];
	const sitemap = generateSitemap(allPages);

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
		}
	});
};

