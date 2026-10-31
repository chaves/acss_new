import { getAllSessions, type Session } from '#lib/helpers/markdown.js';
import { seminars, contentEntries } from './content.js';
import { todayInParis } from './content-query.js';
import { marked } from 'marked';

export async function allAcssSessions(): Promise<Session[]> {
	const sessions = new Map(getAllSessions().map((session) => [session.slug, session]));
	for (let page = 1; ; page++) {
		const rows = await seminars.getAll({
			filters: { type: 'acss' },
			pagination: { page, pageSize: 100 }
		});
		for (const row of rows)
			sessions.set(row.slug, {
				slug: row.slug,
				content: row.abstract || '',
				html: marked.parse(row.abstract || '') as string,
				frontmatter: {
					title: row.title,
					date: row.date,
					time: row.time?.slice(0, 5),
					location: row.location,
					presenter: row.presenter,
					status: row.date >= todayInParis() ? 'upcoming' : 'past',
					presentations: row.presentations
				}
			});
		if (rows.length < 100) break;
	}
	return [...sessions.values()].sort((a, b) =>
		b.frontmatter.date.localeCompare(a.frontmatter.date)
	);
}
export async function upcomingAcssSessions() {
	const today = todayInParis();
	return (await allAcssSessions()).filter(
		(session) => session.frontmatter.date >= today || session.frontmatter.status === 'upcoming'
	);
}
export function acssEntries() {
	return [
		...new Map(
			[
				...getAllSessions().map((session) => ({ slug: session.slug })),
				...contentEntries('SEMINAR', 'acss')
			].map((row) => [row.slug, row])
		).values()
	];
}
