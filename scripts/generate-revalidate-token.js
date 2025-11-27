#!/usr/bin/env node
/**
 * Generate a secure token for revalidation webhooks
 *
 * Usage:
 *   node scripts/generate-revalidate-token.js
 *
 * This generates a cryptographically secure random token
 * suitable for securing the /api/revalidate endpoint.
 */

const crypto = require('crypto');

function generateToken() {
	// Generate 32 bytes of random data and encode as base64
	const token = crypto.randomBytes(32).toString('base64');
	return token;
}

const token = generateToken();

console.log('\n🔑 Secure Revalidation Token Generated\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(token);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📋 Next Steps:\n');
console.log('1. Copy the token above (entire line between the dashes)');
console.log('2. Add it to Vercel Environment Variables:');
console.log('   - Name: REVALIDATE_TOKEN');
console.log('   - Value: [paste token here]');
console.log('   - Environments: Production, Preview\n');
console.log('3. Use the same token in Strapi webhook Authorization header:');
console.log('   - Header Key: Authorization');
console.log('   - Header Value: Bearer [paste token here]\n');
console.log('⚠️  Important: Keep this token secure and never commit it to git!\n');

