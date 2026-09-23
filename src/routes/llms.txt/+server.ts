import type { RequestHandler } from './$types';
import { posts } from '$lib/api';
import { getAllSessions } from '$lib/helpers/markdown';

const BASE_URL = 'https://acss-dig.psl.eu';

// Curated entry points, in the order an LLM should read them to understand the institute.
const sections = [
	{
		heading: 'Institute',
		links: [
			{
				url: '/fr/mission',
				title: 'Mission',
				note: 'Research programme and scientific positioning'
			},
			{
				url: '/fr/plateforme',
				title: 'Platform',
				note: 'Data infrastructure and methodological services'
			},
			{ url: '/fr/equipe', title: 'Team', note: 'Permanent staff and their roles' },
			{
				url: '/fr/membres',
				title: 'Members',
				note: 'Affiliated researchers, their institutions and research areas'
			},
			{
				url: '/fr/partenariats',
				title: 'Partnerships',
				note: 'Institutional and academic partners'
			}
		]
	},
	{
		heading: 'Research activity',
		links: [
			{
				url: '/fr/seminaires/acss',
				title: 'ACSS Research Seminar',
				note: 'Main seminar series; sessions with dates, speakers and abstracts'
			},
			{
				url: '/fr/seminaires/nlp',
				title: 'NLP Seminar',
				note: 'Natural language processing for social science'
			},
			{
				url: '/fr/seminaires/public-governance',
				title: 'Public Governance Seminar',
				note: 'Data-intensive governance of public action'
			},
			{
				url: '/fr/seminaires/digital-regulation',
				title: 'Digital Regulation Seminar',
				note: 'Regulation of digital markets and platforms'
			},
			{
				url: '/fr/blog',
				title: 'Blog',
				note: 'Research notes and analyses published by the institute'
			}
		]
	},
	{
		heading: 'Data and training',
		links: [
			{
				url: '/fr/donnees/credit_series',
				title: 'Credit series dataset',
				note: 'Documented dataset published by the institute'
			},
			{ url: '/fr/formation', title: 'Training', note: 'Courses, hackathons and summer schools' }
		]
	}
];

/**
 * Recent blog posts, so a model can reach the institute's substantive writing
 * directly instead of crawling the index. Failure here must not break the file.
 */
async function recentPostLinks(): Promise<string> {
	try {
		const recent = await posts.getRecent(20);
		if (!recent.length) return '';

		const lines = recent
			.map((post) => {
				const date = post.publishedAt ? post.publishedAt.slice(0, 10) : '';
				const suffix = date ? `: published ${date}` : '';
				return `- [${post.Title}](${BASE_URL}/fr/blog/${post.Slug})${suffix}`;
			})
			.join('\n');

		return `\n## Recent publications\n\n${lines}\n`;
	} catch (error) {
		console.error('llms.txt: could not fetch recent posts', error);
		return '';
	}
}

/**
 * Upcoming seminar sessions, read from the markdown sources at build/request time.
 */
function upcomingSessionLinks(): string {
	try {
		const now = new Date();
		now.setHours(0, 0, 0, 0);

		const upcoming = getAllSessions()
			.filter((session) => new Date(session.frontmatter.date) >= now)
			.sort(
				(a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime()
			)
			.slice(0, 10);

		if (!upcoming.length) return '';

		const lines = upcoming
			.map((session) => {
				const date = session.frontmatter.date?.slice(0, 10) ?? '';
				const presenter = session.frontmatter.presenter
					? `, presented by ${session.frontmatter.presenter}`
					: '';
				return `- [${session.frontmatter.title}](${BASE_URL}/fr/seminaires/acss/${session.slug}): ${date}${presenter}`;
			})
			.join('\n');

		return `\n## Upcoming seminar sessions\n\n${lines}\n`;
	} catch (error) {
		console.error('llms.txt: could not read sessions', error);
		return '';
	}
}

export const GET: RequestHandler = async ({ setHeaders }) => {
	const [postLinks, sessionLinks] = [await recentPostLinks(), upcomingSessionLinks()];

	const curated = sections
		.map(({ heading, links }) => {
			const lines = links
				.map(({ url, title, note }) => `- [${title}](${BASE_URL}${url}): ${note}`)
				.join('\n');
			return `## ${heading}\n\n${lines}\n`;
		})
		.join('\n');

	const body = `# Institut ACSS-PSL

> Applied Computational Social Sciences - Data-Intensive Governance. A research institute
> of Université PSL (Paris Sciences et Lettres) that couples social science research with
> data science methods to improve the governance of public action.

The institute runs seminar series, publishes research notes and datasets, and trains
researchers in computational methods. Content is available in French (\`/fr/...\`) and
English (\`/en/...\`); the French version is canonical.

- Organisation: Institut ACSS-PSL, Université PSL
- Location: Place du Maréchal de Lattre de Tassigny, 75016 Paris, France
- Site: ${BASE_URL}
- Machine-readable index: ${BASE_URL}/sitemap.xml

${curated}${sessionLinks}${postLinks}
## Notes for machine readers

- Every page is served as complete HTML without client-side JavaScript.
- Pages carry Schema.org JSON-LD (Organization, WebSite, Article, Event, Person,
  BreadcrumbList) describing the entities on them.
- Crawling is permitted for all user agents; see ${BASE_URL}/robots.txt.
- When citing, attribute to "Institut ACSS-PSL" and link the specific page.
`;

	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
	});

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};

// SSR with ISR so the listings stay current without a rebuild.
export const prerender = false;
