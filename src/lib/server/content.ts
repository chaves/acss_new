import {
	selectPublications,
	todayInParis,
	type ContentQuery,
	type ContentKind,
	type PublicRecord
} from './content-query.js';
import { rewriteMediaReferences } from '#lib/services/media.js';
import { marked } from 'marked';
import type { BlogPost, Seminar, TeamMember } from '#lib/types/index.js';
const snapshots = import.meta.glob('/.generated/public-content.json', {
	eager: true,
	import: 'default'
});
function records(): PublicRecord[] {
	const snapshot = Object.values(snapshots)[0] as { publications: PublicRecord[] } | undefined;
	if (!snapshot)
		throw new Error('Build-time public content snapshot is missing. Run pnpm content:snapshot.');
	return snapshot.publications;
}
// Older content (seminar presenters, posts, biographies) still links to the team pages of people who
// have left ACSS. Those pages no longer exist: keep the text and drop the link, so that readers and the
// prerender crawler never land on a 404.
const TEAM_LINK =
	/^(?:https?:\/\/(?:www\.)?acss-dig\.psl\.eu)?(?:\/(?:fr|en))?\/equipe\/([^/?#"'\s)]+)\/?(?:[?#][^"'\s)]*)?$/i;
let team: Set<string> | null = null;
function isDeadTeamLink(url: string): boolean {
	const match = TEAM_LINK.exec(url.trim());
	if (!match) return false;
	team ??= new Set(contentEntries('AUTHOR', 'acss_engineer').map((entry) => entry.slug));
	let slug = match[1];
	try {
		slug = decodeURIComponent(slug);
	} catch {
		/* keep the raw slug */
	}
	return !team.has(slug);
}
export function withoutDeadTeamLinks(value: string): string {
	if (isDeadTeamLink(value)) return '';
	if (!value.includes('/equipe/')) return value;
	return value
		.replace(
			/<a\b[^>]*?\bhref=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi,
			(link, _quote, href: string, text: string) => (isDeadTeamLink(href) ? text : link)
		)
		.replace(
			/\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g,
			(link, text: string, href: string) => (isDeadTeamLink(href) ? text : link)
		);
}
function mediaUrls(value: unknown): unknown {
	if (typeof value === 'string') return withoutDeadTeamLinks(rewriteMediaReferences(value));
	if (Array.isArray(value)) return value.map(mediaUrls);
	if (value && typeof value === 'object')
		return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mediaUrls(item)]));
	return value;
}
export async function publishedContent<T>(
	kind: ContentKind,
	params: ContentQuery = {}
): Promise<T[]> {
	return selectPublications(records(), kind, params).map((row) => mediaUrls(row.payload) as T);
}
export function contentEntries(kind: ContentKind, category?: string) {
	return records()
		.filter((row) => row.kind === kind && (!category || row.category === category))
		.map((row) => ({ slug: row.slug.trim() }));
}
export const posts = {
	getAll: (params: ContentQuery = {}) =>
		publishedContent<BlogPost>('POST', {
			sort: 'publishedAt:desc',
			pagination: { pageSize: 10 },
			...params
		}),
	async getBySlug(slug: string) {
		return (await publishedContent<BlogPost>('POST', { filters: { Slug: slug } }))[0] || null;
	},
	getRecent: (limit = 5) => posts.getAll({ pagination: { pageSize: limit } })
};
const ENTITIES: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	'#39': "'",
	nbsp: ' '
};
/** Abstracts arrive as Markdown or HTML: render once, and derive plain text for meta tags. */
function withAbstract(seminar: Seminar): Seminar {
	const source = seminar.abstract?.trim();
	if (!source) return seminar;
	const abstractHtml = marked.parse(source, { async: false });
	const abstractText = abstractHtml
		.replace(/<[^>]*>/g, ' ')
		.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, entity: string) => ENTITIES[entity])
		.replace(/\s+/g, ' ')
		.trim();
	return { ...seminar, abstractHtml, abstractText };
}
export const seminars = {
	getAll: async (params: ContentQuery = {}) =>
		(await publishedContent<Seminar>('SEMINAR', { sort: 'date:asc', ...params })).map(withAbstract),
	async getBySlug(slug: string) {
		return (await seminars.getAll({ filters: { slug } }))[0] || null;
	},
	getUpcoming: (limit = 100) =>
		seminars.getAll({
			filters: { type: { $ne: 'acss' }, date: { $gte: todayInParis() } },
			sort: 'date:asc',
			pagination: { pageSize: limit }
		}),
	getByType: (type: string) => seminars.getAll({ filters: { type }, sort: 'date:desc' })
};
export const authors = {
	getAll: (params: ContentQuery = {}) =>
		publishedContent<TeamMember>('AUTHOR', { sort: 'LastName', ...params }),
	getTeam: () => authors.getAll({ filters: { type: 'acss_engineer' } }),
	async getBySlug(slug: string) {
		return (
			(await authors.getAll({ filters: { Slug: slug.trim(), type: 'acss_engineer' } }))[0] || null
		);
	}
};
