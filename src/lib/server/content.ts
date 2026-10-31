import {
	selectPublications,
	todayInParis,
	type ContentQuery,
	type ContentKind,
	type PublicRecord
} from './content-query.js';
import { rewriteMediaReferences } from '#lib/services/media.js';
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
function mediaUrls(value: unknown): unknown {
	if (typeof value === 'string') return rewriteMediaReferences(value);
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
export const seminars = {
	getAll: (params: ContentQuery = {}) =>
		publishedContent<Seminar>('SEMINAR', { sort: 'date:asc', ...params }),
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
