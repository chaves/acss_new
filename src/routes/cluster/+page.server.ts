import type { PageServerLoad } from './$types';
import { practices } from '#lib/server/practices.js';
import { clusterProjects } from '#lib/server/projects.js';

export const load: PageServerLoad = () => {
	const { projects, outputs } = clusterProjects();
	const titles = new Map(projects.map((project) => [project.id, project.title]));
	return {
		practices: practices().pages.map(({ slug, title, description }) => ({ slug, title, description })),
		latestOutputs: outputs.slice(0, 3).map((output) => ({ ...output, projectTitle: titles.get(output.project) || '' }))
	};
};
