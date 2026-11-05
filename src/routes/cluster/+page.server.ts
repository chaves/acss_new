import type { PageServerLoad } from './$types';
import { practices } from '#lib/server/practices.js';

export const load: PageServerLoad = () => ({
	practices: practices().pages.map(({ slug, title, description }) => ({ slug, title, description }))
});
