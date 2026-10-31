// Build-time only. Export exactly the public projections, never working drafts or accounts.
import { createConnection } from 'mysql2/promise';
import { mkdir, writeFile, rename } from 'node:fs/promises';
import { resolve } from 'node:path';
const value = process.env.ACSS_CONTENT_DATABASE_URL;
if (!value)
	throw new Error('ACSS_CONTENT_DATABASE_URL must be configured before building the public site.');
const url = new URL(value),
	local = ['localhost', '127.0.0.1'].includes(url.hostname);
if (url.protocol !== 'mysql:') throw new Error('Invalid content database protocol.');
const db = await createConnection({
	host: url.hostname,
	port: Number(url.port || 3306),
	user: decodeURIComponent(url.username),
	password: decodeURIComponent(url.password),
	database: decodeURIComponent(url.pathname.slice(1)),
	...(local && url.searchParams.get('socket')
		? { socketPath: url.searchParams.get('socket') }
		: {}),
	ssl: local ? undefined : { rejectUnauthorized: true },
	connectTimeout: 8000,
	dateStrings: true,
	timezone: 'Z',
	multipleStatements: false
});
try {
	const [rows] = await db.query(
		'SELECT kind, payload, publishedAt, updatedAt, title, slug, category, eventDate, postId, seminarId, authorId FROM CmsPublication ORDER BY kind, publishedAt, id'
	);
	const publications = rows.map((row) => ({
		...row,
		payload: typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload
	}));
	const authors = new Map(
		publications.filter((row) => row.kind === 'AUTHOR').map((row) => [row.payload.id, row.payload])
	);
	// Relations follow the current published author profile, as they did in Strapi.
	for (const row of publications)
		if (row.kind === 'POST' && Array.isArray(row.payload.authors))
			row.payload.authors = row.payload.authors.map((author) => authors.get(author.id) || author);
	const directory = resolve('.generated');
	await mkdir(directory, { recursive: true });
	const path = resolve(directory, 'public-content.json'),
		temporary = path + '.tmp';
	await writeFile(
		temporary,
		JSON.stringify({ generatedAt: new Date().toISOString(), publications }) + '\n',
		{ mode: 0o600 }
	);
	await rename(temporary, path);
	console.log(
		'Public content snapshot:',
		JSON.stringify(
			Object.fromEntries(
				['POST', 'SEMINAR', 'AUTHOR'].map((kind) => [
					kind,
					publications.filter((row) => row.kind === kind).length
				])
			)
		)
	);
} catch (err) {
	console.error('Public snapshot failed:', err?.code || err?.name || 'UnknownError');
	process.exitCode = 1;
} finally {
	await db.end();
}
