// Build-time only. Fetch the public "good practices" pages of the cluster documentation from the extranet.
// The extranet renders and sanitises them, and only exposes pages marked `public: true`.
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source =
	process.env.ACSS_PRACTICES_FILE ||
	process.env.ACSS_PRACTICES_URL ||
	'https://extranet.acss-psl.eu/api/bonnes-pratiques';
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validate(value) {
	if (!value || typeof value !== 'object' || !Array.isArray(value.pages)) throw new Error('shape');
	if (typeof value.revision?.sha !== 'string' || typeof value.revision?.date !== 'string')
		throw new Error('revision');
	const pages = value.pages.filter((page) => {
		const valid =
			typeof page?.slug === 'string' &&
			slug.test(page.slug) &&
			typeof page.title === 'string' &&
			typeof page.html === 'string' &&
			Array.isArray(page.toc);
		if (!valid) console.warn('Good practices: skipped an invalid page', page?.slug);
		return valid;
	});
	return {
		revision: { sha: value.revision.sha, date: value.revision.date },
		pages: pages.map(({ slug, title, description, order, html, toc }) => ({
			slug,
			title,
			description: typeof description === 'string' ? description : '',
			order: Number(order) || 0,
			html,
			toc: toc
				.filter((item) => typeof item?.id === 'string' && typeof item?.text === 'string')
				.map(({ id, text, level }) => ({ id, text, level: level === 3 ? 3 : 2 }))
		}))
	};
}

try {
	const raw = process.env.ACSS_PRACTICES_FILE
		? await readFile(source, 'utf8')
		: await fetch(source, { signal: AbortSignal.timeout(20000) }).then((response) => {
				if (!response.ok) throw new Error('HTTP ' + response.status);
				return response.text();
			});
	const collection = validate(JSON.parse(raw));
	const directory = resolve('.generated');
	await mkdir(directory, { recursive: true });
	const path = resolve(directory, 'good-practices.json'),
		temporary = path + '.tmp';
	await writeFile(temporary, JSON.stringify(collection) + '\n');
	await rename(temporary, path);
	console.log(
		'Good practices snapshot:',
		JSON.stringify({ revision: collection.revision.sha.slice(0, 7), pages: collection.pages.length })
	);
} catch (err) {
	console.error('Good practices snapshot failed:', err?.message || err?.name || 'UnknownError');
	process.exitCode = 1;
}
