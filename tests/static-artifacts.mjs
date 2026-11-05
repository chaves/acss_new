import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
const root = '.svelte-kit/output/prerendered/pages';
const snapshot = JSON.parse(await readFile('.generated/public-content.json', 'utf8'));
const practices = JSON.parse(await readFile('.generated/good-practices.json', 'utf8'));
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
