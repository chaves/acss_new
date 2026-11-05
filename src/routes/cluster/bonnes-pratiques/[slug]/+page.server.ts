import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { localizePractices, practices } from '#lib/server/practices.js';
import { getLocale } from '#lib/paraglide/runtime.js';

export const entries: EntryGenerator = () => practices().pages.map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const { revision, pages } = practices();
	const index = pages.findIndex((page) => page.slug === params.slug);
	if (index < 0) error(404, 'Not found');
	const link = (page?: (typeof pages)[number]) => (page ? { slug: page.slug, title: page.title } : null);
	return {
		page: { ...pages[index], html: localizePractices(pages[index].html, getLocale()) },
		updated: revision.date,
		previous: link(pages[index - 1]),
		next: link(pages[index + 1])
	};
};
