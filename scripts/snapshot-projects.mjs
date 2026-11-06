// Build-time only. Fetch the validated cluster projects and their research outputs from the extranet.
// The extranet exposes public fields only (titles, names, institutions) and sanitised output text.
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source =
	process.env.ACSS_PROJECTS_FILE ||
	process.env.ACSS_PROJECTS_URL ||
	'https://extranet.acss-psl.eu/api/cluster/projets';
const id = /^[po][0-9a-f]{10}$/;
const text = (value, max = 500) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const webUrl = (value) => {
	try {
		const url = new URL(value);
		return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
	} catch {
		return '';
	}
};

function validate(value) {
	if (!value || !Array.isArray(value.projects) || !Array.isArray(value.outputs)) throw new Error('shape');
	const projects = value.projects
		.filter((project) => id.test(project?.id) && text(project.title))
		.map((project) => ({
			id: project.id,
			title: text(project.title),
			applicant: text(project.applicant, 200),
			institution: text(project.institution, 250),
			lab: text(project.lab, 250),
			lead: project.lead && text(project.lead.name, 200) ? { name: text(project.lead.name, 200), affiliation: text(project.lead.affiliation, 300) } : null,
			ongoing: project.ongoing === true
		}));
	const known = new Set(projects.map((project) => project.id));
	const outputs = value.outputs
		.filter((output) => id.test(output?.id) && known.has(output.project) && /^\d{4}-\d{2}-\d{2}$/.test(output.date) && typeof output.html === 'string')
		.map((output) => ({ id: output.id, project: output.project, type: text(output.type, 40) || 'other', date: output.date, url: webUrl(output.url), html: output.html }));
	return { projects, outputs };
}

try {
	const raw = process.env.ACSS_PROJECTS_FILE
		? await readFile(source, 'utf8')
		: await fetch(source, { signal: AbortSignal.timeout(20000) }).then((response) => {
				if (!response.ok) throw new Error('HTTP ' + response.status);
				return response.text();
			});
	const collection = validate(JSON.parse(raw));
	const directory = resolve('.generated');
	await mkdir(directory, { recursive: true });
	const path = resolve(directory, 'cluster-projects.json'),
		temporary = path + '.tmp';
	await writeFile(temporary, JSON.stringify(collection) + '\n');
	await rename(temporary, path);
	console.log('Cluster projects snapshot:', JSON.stringify({ projects: collection.projects.length, outputs: collection.outputs.length }));
} catch (err) {
	console.error('Cluster projects snapshot failed:', err?.message || err?.name || 'UnknownError');
	process.exitCode = 1;
}
