#!/usr/bin/env node
/**
 * Test webhook connectivity and configuration
 *
 * Usage:
 *   node scripts/test-webhook.js <webhook-url> [token]
 *
 * Examples:
 *   node scripts/test-webhook.js https://api.vercel.com/v1/integrations/deploy/...
 *   node scripts/test-webhook.js https://acss-dig.psl.eu/api/revalidate YOUR_TOKEN
 */

const https = require('https');
const http = require('http');

function testWebhook(url, token = null) {
	return new Promise((resolve, reject) => {
		const urlObj = new URL(url);
		const isHttps = urlObj.protocol === 'https:';
		const client = isHttps ? https : http;

		const headers = {
			'Content-Type': 'application/json'
		};

		// Add Authorization header if token provided
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const options = {
			hostname: urlObj.hostname,
			port: urlObj.port || (isHttps ? 443 : 80),
			path: urlObj.pathname + urlObj.search,
			method: 'GET',
			headers
		};

		console.log(`\n🧪 Testing webhook: ${url}`);
		console.log(`   Method: ${options.method}`);
		if (token) {
			console.log(`   Authorization: Bearer ${token.substring(0, 10)}...`);
		}
		console.log('');

		const req = client.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				const result = {
					statusCode: res.statusCode,
					headers: res.headers,
					body: data
				};

				// Try to parse JSON
				try {
					result.json = JSON.parse(data);
				} catch (e) {
					// Not JSON, that's okay
				}

				resolve(result);
			});
		});

		req.on('error', (error) => {
			reject(error);
		});

		req.setTimeout(10000, () => {
			req.destroy();
			reject(new Error('Request timeout'));
		});

		req.end();
	});
}

async function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error('\n❌ Error: Webhook URL required\n');
		console.log('Usage:');
		console.log('  node scripts/test-webhook.js <webhook-url> [token]\n');
		console.log('Examples:');
		console.log('  # Test Vercel Deploy Hook (no token needed)');
		console.log('  node scripts/test-webhook.js https://api.vercel.com/v1/integrations/deploy/...\n');
		console.log('  # Test Revalidation API (token required)');
		console.log('  node scripts/test-webhook.js https://acss-dig.psl.eu/api/revalidate?path=/en/blog YOUR_TOKEN\n');
		process.exit(1);
	}

	const webhookUrl = args[0];
	const token = args[1] || null;

	try {
		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
		const result = await testWebhook(webhookUrl, token);

		console.log('📊 Response:');
		console.log(`   Status: ${result.statusCode} ${getStatusText(result.statusCode)}`);
		console.log('');

		if (result.json) {
			console.log('📦 JSON Response:');
			console.log(JSON.stringify(result.json, null, 2));
		} else if (result.body) {
			console.log('📦 Response Body:');
			console.log(result.body);
		}

		console.log('');
		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

		if (result.statusCode >= 200 && result.statusCode < 300) {
			console.log('\n✅ Webhook is working correctly!\n');
			process.exit(0);
		} else if (result.statusCode === 401) {
			console.log('\n❌ Unauthorized: Check your token\n');
			process.exit(1);
		} else if (result.statusCode === 404) {
			console.log('\n❌ Not Found: Check your webhook URL\n');
			process.exit(1);
		} else {
			console.log('\n⚠️  Webhook returned unexpected status code\n');
			process.exit(1);
		}
	} catch (error) {
		console.error('\n❌ Error testing webhook:');
		console.error(`   ${error.message}\n`);
		console.log('💡 Troubleshooting:');
		console.log('   - Check that the URL is correct');
		console.log('   - Verify your internet connection');
		console.log('   - Check if the webhook requires authentication\n');
		process.exit(1);
	}
}

function getStatusText(statusCode) {
	const statusTexts = {
		200: 'OK',
		201: 'Created',
		204: 'No Content',
		400: 'Bad Request',
		401: 'Unauthorized',
		403: 'Forbidden',
		404: 'Not Found',
		500: 'Internal Server Error',
		502: 'Bad Gateway',
		503: 'Service Unavailable'
	};
	return statusTexts[statusCode] || 'Unknown';
}

main();

