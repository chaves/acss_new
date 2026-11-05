import type { PageServerLoad } from './$types';
import { practices } from '#lib/server/practices.js';

export const load: PageServerLoad = () => {
	const { revision, pages } = practices();
	return {
		updated: revision.date,
		pages: pages.map(({ slug, title, description }) => ({ slug, title, description }))
	};
};
