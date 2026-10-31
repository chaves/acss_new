import { createHmac } from 'node:crypto';
import type { RowDataPacket } from 'mysql2';
const env = process.env;
import { getPool } from './database.js';

export async function acceptNewsletterAttempt(address: string) {
	const key = createHmac('sha256', env.ACSS_NEWSLETTER_DATABASE_URL || '')
		.update(address)
		.digest('hex');
	const pool = getPool();
	await pool.execute(
		'INSERT INTO NewsletterThrottle (`key`,attempts,windowStart) VALUES (?,1,CURRENT_TIMESTAMP(3)) ON DUPLICATE KEY UPDATE attempts=IF(windowStart<CURRENT_TIMESTAMP(3)-INTERVAL 1 HOUR,1,attempts+1),windowStart=IF(windowStart<CURRENT_TIMESTAMP(3)-INTERVAL 1 HOUR,CURRENT_TIMESTAMP(3),windowStart)',
		[key]
	);
	const [rows] = await pool.execute<RowDataPacket[]>(
		'SELECT attempts FROM NewsletterThrottle WHERE `key`=?',
		[key]
	);
	return rows[0].attempts <= 10;
}
export async function subscribe(value: {
	firstName: string;
	lastName: string;
	institution: string;
	email: string;
}) {
	try {
		await getPool().execute(
			'INSERT INTO MailingListSubscription (firstName,lastName,institution,email) VALUES (?,?,?,?)',
			[value.firstName, value.lastName, value.institution, value.email]
		);
		return 'subscribed' as const;
	} catch (err) {
		if ((err as { code?: string }).code === 'ER_DUP_ENTRY') return 'duplicate' as const;
		throw err;
	}
}
