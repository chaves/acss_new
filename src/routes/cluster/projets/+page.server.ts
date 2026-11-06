import type { PageServerLoad } from './$types';
import { clusterProjects } from '#lib/server/projects.js';

export const load: PageServerLoad = () => clusterProjects();
