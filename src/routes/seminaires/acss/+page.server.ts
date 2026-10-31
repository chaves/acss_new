import type { PageServerLoad } from './$types';
import { allAcssSessions } from '#lib/server/acss-sessions.js';
import { todayInParis } from '#lib/server/content-query.js';
export const prerender = true;
export const load = (async () => {
	const sessions = await allAcssSessions(),
		today = todayInParis();
	return {
		upcomingSessions: sessions.filter(
			(session) => session.frontmatter.date >= today || session.frontmatter.status === 'upcoming'
		),
		pastSessions: sessions.filter(
			(session) => session.frontmatter.date < today && session.frontmatter.status !== 'upcoming'
		)
	};
}) satisfies PageServerLoad;
