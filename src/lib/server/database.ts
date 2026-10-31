import mysql from 'mysql2';
import type { Pool } from 'mysql2/promise';
import { attachDatabasePool } from '@vercel/functions';
const env = process.env;

let pool: Pool | undefined;
export function getPool(): Pool {
	if (pool) return pool;
	if (!env.ACSS_NEWSLETTER_DATABASE_URL)
		throw new Error('ACSS_NEWSLETTER_DATABASE_URL is not configured.');
	const url = new URL(env.ACSS_NEWSLETTER_DATABASE_URL);
	if (url.protocol !== 'mysql:') throw new Error('Invalid database protocol.');
	const local = ['localhost', '127.0.0.1'].includes(url.hostname);
	const raw = mysql.createPool({
		host: url.hostname,
		port: Number(url.port || 3306),
		user: decodeURIComponent(url.username),
		password: decodeURIComponent(url.password),
		database: decodeURIComponent(url.pathname.slice(1)),
		...(local && url.searchParams.get('socket')
			? { socketPath: url.searchParams.get('socket')! }
			: {}),
		ssl: local ? undefined : { rejectUnauthorized: true },
		connectionLimit: 2,
		maxIdle: 1,
		idleTimeout: 5000,
		connectTimeout: 5000,
		waitForConnections: true,
		queueLimit: 20,
		dateStrings: true,
		timezone: 'Z',
		multipleStatements: false
	});
	attachDatabasePool(raw);
	pool = raw.promise();
	return pool;
}
