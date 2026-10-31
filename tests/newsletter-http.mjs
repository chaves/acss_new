import assert from 'node:assert/strict';
import { randomUUID, createHmac } from 'node:crypto';
import { createConnection } from 'mysql2/promise';
const origin = 'http://127.0.0.1:5188',
	url = new URL(process.env.ACSS_NEWSLETTER_DATABASE_URL);
assert.equal(url.pathname, '/acss_test');
assert.ok(['localhost', '127.0.0.1'].includes(url.hostname));
const db = await createConnection({
	host: url.hostname,
	user: decodeURIComponent(url.username),
	password: decodeURIComponent(url.password),
	database: 'acss_test',
	socketPath: url.searchParams.get('socket')
});
const email = 'static-' + randomUUID() + '@example.test',
	key = createHmac('sha256', process.env.ACSS_NEWSLETTER_DATABASE_URL)
		.update('127.0.0.1')
		.digest('hex');
const path = '/fr/lettre-d-information';
const submit = (data = {}, source = origin) =>
	fetch(origin + path, {
		method: 'POST',
		headers: { origin: source },
		redirect: 'manual',
		body: new URLSearchParams({
			firstName: 'Vérification',
			lastName: 'Fictive',
			institution: 'Test local',
			email,
			...data
		}),
		signal: AbortSignal.timeout(20000)
	});
try {
	await db.execute('DELETE FROM NewsletterThrottle WHERE `key`=?', [key]);
	const page = await fetch(origin + path);
	assert.equal(page.status, 200);
	assert.match(await page.text(), /name="email"/);
	assert.equal((await submit({}, 'https://invalid.example')).status, 403);
	assert.equal((await submit({ email: 'invalid' })).status, 400);
	assert.equal((await submit({ website: 'bot' })).status, 200);
	let [rows] = await db.execute(
		'SELECT COUNT(*) count FROM MailingListSubscription WHERE email=?',
		[email]
	);
	assert.equal(rows[0].count, 0);
	const success = await submit();
	assert.equal(success.status, 200, await success.clone().text());
	assert.match(success.headers.get('cache-control'), /no-store/);
	[rows] = await db.execute('SELECT COUNT(*) count FROM MailingListSubscription WHERE email=?', [
		email
	]);
	assert.equal(rows[0].count, 1);
	assert.equal((await submit()).status, 400);
	for (let i = 0; i < 8; i++) assert.equal((await submit()).status, 400);
	assert.equal((await submit()).status, 429);
	console.log(
		'PASS newsletter native POST: origin, validation, honeypot, real local SQL insertion, duplicate, no-store and throttling'
	);
} finally {
	await db.execute('DELETE FROM MailingListSubscription WHERE email=?', [email]);
	await db.execute('DELETE FROM NewsletterThrottle WHERE `key`=?', [key]);
	await db.end();
}
