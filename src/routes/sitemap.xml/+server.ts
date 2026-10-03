import type { RequestHandler } from './$types';
import { posts, seminars, authors } from '#lib/api/index.js';

const BASE_URL = 'https://acss-dig.psl.eu';

type SitemapPage = { url: string; changefreq: string; priority: number; lastmod?: string };

// Static pages with their priorities and change frequencies
const staticPages: SitemapPage[] = [
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
	{ url: '/seminaires/digital-regulation', changefreq: 'weekly', priority: 0.8 },
	{ url: '/seminaires/trence', changefreq: 'weekly', priority: 0.8 },
	{ url: '/donnees', changefreq: 'yearly', priority: 0.6 },
	{ url: '/donnees/credit_series', changefreq: 'yearly', priority: 0.6 },
	{ url: '/lettre-d-information', changefreq: 'yearly', priority: 0.5 }
];

// ACSS sessions are local markdown files. import.meta.glob resolves the list at build time,
// so it also works in the serverless function where src/ is not on disk (unlike fs reads).
const sessionFiles = import.meta.glob('/src/routes/seminaires/acss/sessions/*.md', {
	query: '?raw'
});
const sessionSlugs = Object.keys(sessionFiles).map((file) =>
	file.slice(file.lastIndexOf('/') + 1, -'.md'.length)
);

// Strapi seminar type → route segment (mirrors the type checks in each [slug] loader)
const seminarRoutes: Record<string, string> = {
	nlp: 'nlp',
	pub: 'public-governance',
	digitalReg: 'digital-regulation',
	TrEnCE: 'trence'
};

// Languages to generate URLs for
const languages = ['en', 'fr'];

const PAGE_SIZE = 100;

// Fetch every page of a Strapi collection instead of relying on the server's default page size
async function fetchAll<T>(fetchPage: (page: number) => Promise<T[]>): Promise<T[]> {
	const all: T[] = [];
	for (let page = 1; ; page++) {
		const batch = await fetchPage(page);
		all.push(...batch);
		if (batch.length < PAGE_SIZE) return all;
	}
}

async function fetchDynamicPages(): Promise<SitemapPage[]> {
	const pagination = (page: number) => ({ pagination: { page, pageSize: PAGE_SIZE } });

	// Each source fails independently so one CMS error doesn't empty the whole sitemap
	const [postPages, seminarPages, teamPages] = await Promise.all([
		fetchAll((page) => posts.getAll(pagination(page)))
			.then((items) =>
				items.map((post) => ({
					url: `/blog/${post.Slug}`,
					changefreq: 'monthly',
					priority: 0.7,
					lastmod: post.updatedAt || post.publishedAt
				}))
			)
			.catch((error) => {
				console.error('Sitemap: failed to fetch posts', error);
				return [];
			}),
		fetchAll((page) => seminars.getAll({ sort: 'date:desc', ...pagination(page) }))
			.then((items) =>
				items
					.filter((seminar) => seminar.slug && seminarRoutes[seminar.type])
					.map((seminar) => ({
						url: `/seminaires/${seminarRoutes[seminar.type]}/${seminar.slug}`,
						changefreq: 'yearly',
						priority: 0.6,
						lastmod: (seminar as { updatedAt?: string }).updatedAt
					}))
			)
			.catch((error) => {
				console.error('Sitemap: failed to fetch seminars', error);
				return [];
			}),
		authors
			.getTeam()
			.then((items) =>
				items.map((member) => ({
					url: `/equipe/${member.Slug.trim()}`,
					changefreq: 'monthly',
					priority: 0.6,
					lastmod: (member as { updatedAt?: string }).updatedAt
				}))
			)
			.catch((error) => {
				console.error('Sitemap: failed to fetch team', error);
				return [];
			})
	]);

	const sessionPages = sessionSlugs.map((slug) => ({
		url: `/seminaires/acss/${slug}`,
		changefreq: 'yearly',
		priority: 0.6
	}));

	// Individual member pages (/membres/[slug]) are intentionally not linked anymore, so they are left out
	return [...postPages, ...seminarPages, ...teamPages, ...sessionPages];
}

// Matches the canonical URLs: the home page is /fr, not /fr/ (which redirects)
const pageUrl = (lang: string, url: string) => `${BASE_URL}/${lang}${url === '/' ? '' : url}`;

function generateSitemap(pages: SitemapPage[]) {
	// Generate URLs for each page in each language
	const urlEntries = pages
		.map((page) => {
			const lastmod = page.lastmod
				? `\n    <lastmod>${new Date(page.lastmod).toISOString()}</lastmod>`
				: '';

			// Build alternate links for each language
			const alternates = languages
				.map(
					(lang) =>
						`    <xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(lang, page.url)}" />`
				)
				.join('\n');

			// Create URL entry for each language variant
			return languages
				.map(
					(lang) => `  <url>
    <loc>${pageUrl(lang, page.url)}</loc>${lastmod}
${alternates}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
				)
				.join('\n');
		})
		.join('\n');

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
