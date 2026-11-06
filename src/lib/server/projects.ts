// Validated cluster projects and their research outputs, taken at build time from the extranet.
// See scripts/snapshot-projects.mjs. Only public fields are present.
export type ClusterProject = {
	id: string;
	title: string;
	applicant: string;
	institution: string;
	lab: string;
	lead: { name: string; affiliation: string } | null;
	ongoing: boolean;
};
export type ClusterOutput = { id: string; project: string | null; author: string; type: string; date: string; url: string; html: string };
type Collection = { projects: ClusterProject[]; outputs: ClusterOutput[] };

export const PROJECTS_PATH = '/cluster/projets';

const snapshots = import.meta.glob('/.generated/cluster-projects.json', { eager: true, import: 'default' });

export function clusterProjects(): Collection {
	const snapshot = Object.values(snapshots)[0] as Collection | undefined;
	if (!snapshot) throw new Error('Cluster projects snapshot is missing. Run pnpm content:snapshot.');
	return snapshot;
}
