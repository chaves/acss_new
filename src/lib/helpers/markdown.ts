import fs from 'fs';
import path from 'path';
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
}

export interface Session {
	slug: string;
	frontmatter: SessionFrontmatter;
	content: string;
	html: string;
}

const SESSIONS_DIR = path.join(process.cwd(), 'src/routes/seminaires/acss/sessions');

/**
 * Get all session markdown files
 */
export function getAllSessions(): Session[] {
	try {
		const files = fs.readdirSync(SESSIONS_DIR);
		const sessions = files
			.filter((file: string) => file.endsWith('.md'))
			.map((file: string) => {
				const slug = file.replace('.md', '');
				const session = getSessionBySlug(slug);
				return session;
			})
			.filter((session: Session | null): session is Session => session !== null)
			.sort((a: Session, b: Session) => {
				// Sort by date descending (newest first)
				return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
			});

		return sessions;
	} catch (error) {
		console.error('Error reading sessions directory:', error);
		return [];
	}
}

/**
 * Get a specific session by slug
 */
export function getSessionBySlug(slug: string): Session | null {
	try {
		const filePath = path.join(SESSIONS_DIR, `${slug}.md`);

		if (!fs.existsSync(filePath)) {
			return null;
		}

		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(fileContent);

		// Parse markdown to HTML (marked.parse is synchronous)
		const html = marked.parse(content) as string;

		return {
			slug,
			frontmatter: data as SessionFrontmatter,
			content,
			html
		};
	} catch (error) {
		console.error(`Error reading session ${slug}:`, error);
		return null;
	}
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
