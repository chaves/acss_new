import matter from 'gray-matter';
import { marked } from 'marked';

export interface SessionFrontmatter {
	title: string;
	date: string;
	time?: string;
	location?: string;
	image?: string;
	status?: 'upcoming' | 'past';
	theme?: string;
	presenter?: string;
	registration?: string;
	organizers?: Array<{ name: string; url: string }>;
	contact_present?: string;
	contact_attend?: string;
	presentations?: Array<{ title: string; speaker: string; file: string | { url: string } }>;
}

export interface Session {
	slug: string;
	frontmatter: SessionFrontmatter;
	content: string;
	html: string;
}

const sessionFiles = import.meta.glob('/src/routes/seminaires/acss/sessions/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;
const filesBySlug = new Map(
	Object.entries(sessionFiles).map(([file, content]) => [
		file.slice(file.lastIndexOf('/') + 1, -3),
		content
	])
);

export function getAllSessions(): Session[] {
	return [...filesBySlug.keys()]
		.map(getSessionBySlug)
		.filter((session): session is Session => session !== null)
		.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}
export function getSessionBySlug(slug: string): Session | null {
	const source = filesBySlug.get(slug);
	if (source === undefined) return null;
	const { data, content } = matter(source);
	return {
		slug,
		frontmatter: {
			...data,
			date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date)
		} as SessionFrontmatter,
		content,
		html: marked.parse(content) as string
	};
}

/**
 * Get upcoming sessions
 */
export function getUpcomingSessions(): Session[] {
	const allSessions = getAllSessions();
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return allSessions.filter((session) => {
		const sessionDate = new Date(session.frontmatter.date);
		return sessionDate >= today || session.frontmatter.status === 'upcoming';
	});
}

/**
 * Get past sessions
 */
export function getPastSessions(): Session[] {
	const allSessions = getAllSessions();
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return allSessions.filter((session) => {
		const sessionDate = new Date(session.frontmatter.date);
		return sessionDate < today && session.frontmatter.status !== 'upcoming';
	});
}
