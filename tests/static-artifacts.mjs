import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
const root = '.svelte-kit/output/prerendered/pages';
const snapshot = JSON.parse(await readFile('.generated/public-content.json', 'utf8'));
const practices = JSON.parse(await readFile('.generated/good-practices.json', 'utf8'));
const clusterProjects = JSON.parse(await readFile('.generated/cluster-projects.json', 'utf8'));
const routes = {
	nlp: 'nlp',
	pub: 'public-governance',
	digitalReg: 'digital-regulation',
	TrEnCE: 'trence',
	acss: 'acss'
};
const decode = (value) =>
	value.replace(
		/&(?:amp|lt|gt|quot|apos|#39|#x27);/g,
		(entity) =>
			({
				'&amp;': '&',
				'&lt;': '<',
				'&gt;': '>',
				'&quot;': '"',
				'&apos;': "'",
				'&#39;': "'",
				'&#x27;': "'"
			})[entity]
	);
const allFiles = async (directory) =>
	(
		await Promise.all(
			(await readdir(directory, { withFileTypes: true })).map(async (entry) =>
				entry.isDirectory() ? allFiles(join(directory, entry.name)) : [join(directory, entry.name)]
			)
		)
	).flat();
let verified = 0;
for (const language of ['fr', 'en']) {
	const expected = [
		['', null],
		['/blog', null],
		['/cluster', null],
		['/equipe', null],
		['/cluster/bonnes-pratiques', null],
		['/cluster/projets', null],
		...practices.pages.map((page) => ['/cluster/bonnes-pratiques/' + page.slug, page.title])
	];
	for (const row of snapshot.publications) {
		if (row.kind === 'POST') expected.push(['/blog/' + row.slug, row.payload.Title]);
		else if (row.kind === 'SEMINAR' && routes[row.category])
			expected.push(['/seminaires/' + routes[row.category] + '/' + row.slug, row.payload.title]);
		else if (row.kind === 'AUTHOR' && row.category === 'acss_engineer')
			expected.push([
				'/equipe/' + row.slug.trim(),
				row.payload.FirstName + ' ' + row.payload.LastName
			]);
	}
	for (const [path, title] of expected) {
		const html = await readFile(join(root, language + path + '.html'), 'utf8');
		assert.match(html, new RegExp(`<html[^>]*lang="${language}"`), path);
		const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
		assert.equal(canonical, 'https://acss-dig.psl.eu/' + language + path, path);
		assert.match(html, /<h1\b/, path);
		if (title)
			assert.ok(decode(html.replace(/<[^>]*>/g, ' ')).includes(title), path + ' title in HTML');
		assert.match(html, /hreflang="en"/, path);
		assert.match(html, /hreflang="fr"/, path);
		const schemas = [
			...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)
		];
		assert.ok(schemas.length, path + ' JSON-LD');
		for (const match of schemas) JSON.parse(match[1]);
		assert.ok(!html.includes('https://cms.acss-psl.eu/uploads/'), path + ' migrated media');
		verified++;
	}
}
// Région Île-de-France band in the footer of every page, starting with the home pages.
for (const [language, text] of [['fr', 'Cluster de calcul financé par la Région Île-de-France'], ['en', 'Computing cluster funded by the Île-de-France Region']]) {
	const html = await readFile(join(root, language + '.html'), 'utf8');
	assert.ok(decode(html.replace(/<[^>]*>/g, ' ')).includes(text), language + ' home Région band');
	assert.match(html, /region-ile-de-france\.svg/, language + ' home Région logo');
}
// Cluster projects: every public project is listed, with the Région Île-de-France logo and mention.
for (const [language, mention] of [['fr', 'Action financée par la Région Île-de-France'], ['en', 'Action funded by the Île-de-France Region']]) {
	for (const path of ['/cluster/projets', '/cluster']) {
		const text = decode((await readFile(join(root, language + path + '.html'), 'utf8')).replace(/<[^>]*>/g, ' '));
		assert.ok(text.includes(mention), language + path + ' Région mention');
	}
	const html = await readFile(join(root, language + '/cluster/projets.html'), 'utf8');
	assert.match(html, /region-ile-de-france\.svg/, language + ' Région logo');
	assert.match(html, /href="https:\/\/www\.iledefrance\.fr"/, language + ' Région link');
	const text = decode(html.replace(/<[^>]*>/g, ' '));
	for (const project of clusterProjects.projects) assert.ok(text.includes(project.title), language + ' project ' + project.id);
}
// No page links to a team page that does not exist (former members are shown without a link).
const teamPages = new Set(
	snapshot.publications
		.filter((row) => row.kind === 'AUTHOR' && row.category === 'acss_engineer')
		.map((row) => row.slug.trim())
);
let teamLinks = 0;
for (const file of await allFiles(root)) {
	if (!file.endsWith('.html')) continue;
	const html = await readFile(file, 'utf8');
	for (const [, slug] of html.matchAll(/href="(?:https:\/\/acss-dig\.psl\.eu)?(?:\/(?:fr|en))?\/equipe\/([^"/?#]+)/g)) {
		assert.ok(teamPages.has(decodeURIComponent(slug)), `${file} links to a missing team page: ${slug}`);
		teamLinks++;
	}
}
assert.ok(teamLinks > 0, 'team links are still rendered for current members');
const secrets = [];
for (const key of ['ACSS_CONTENT_DATABASE_URL','ACSS_NEWSLETTER_DATABASE_URL']) {
 if (process.env[key]) { const url=new URL(process.env[key]); secrets.push(decodeURIComponent(url.password),url.href); }
}
for (const path of (process.env.SECRET_ENV_FILES || '').split('|').filter(Boolean)) {
	for (const line of (await readFile(path, 'utf8')).split('\n')) {
		if (!/^ACSS_(CONTENT|NEWSLETTER)_DATABASE_URL=/.test(line)) continue;
		const url = new URL(JSON.parse(line.slice(line.indexOf('=') + 1)));
		secrets.push(decodeURIComponent(url.password), url.href);
	}
}
for (const directory of ['.svelte-kit/output/client', root])
	for (const file of await allFiles(directory)) {
		if (!/\.(?:js|html|json)$/.test(file)) continue;
		const text = await readFile(file, 'utf8');
		for (const secret of secrets) assert.ok(!text.includes(secret), 'Secret exposed in ' + file);
	}
console.log(
	JSON.stringify({
		verifiedEditorialHtmlPages: verified,
		languages: ['fr', 'en'],
		canonicalAndHreflang: true,
		jsonLdValid: true,
		noCredentialsInPublicArtifacts: true
	})
);
