/**
 * On-Demand Revalidation API Endpoint
 *
 * This endpoint allows Strapi (via webhook) to trigger immediate page regeneration
 * when content is updated, instead of waiting for ISR expiration.
 *
 * Usage from Strapi webhook:
 * POST https://your-site.com/api/revalidate
 * Headers: { "Authorization": "Bearer YOUR_SECRET_TOKEN" }
 * Body: { "paths": ["/en/blog", "/fr/blog", "/en/blog/my-post"] }
 */
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { LOCALES } from '$lib/constants';

// Secret token to secure the endpoint (set in Vercel environment variables)
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || '';

// Map Strapi content types to website paths that need revalidation
// Supports multiple naming conventions that Strapi might use
const CONTENT_TYPE_TO_PATHS: Record<string, string[]> = {
	// Blog posts (multiple possible names)
	'api::post.post': ['/en/blog', '/fr/blog'],
	'post': ['/en/blog', '/fr/blog'],
	'api::blog-post.blog-post': ['/en/blog', '/fr/blog'],

	// Team members / Authors (multiple possible names)
	'api::author.author': ['/en/equipe', '/fr/equipe'],
	'author': ['/en/equipe', '/fr/equipe'],
	'api::team-member.team-member': ['/en/equipe', '/fr/equipe'],

	// Seminars (multiple possible names)
	'api::seminar.seminar': [
		'/en/seminaires/nlp',
		'/fr/seminaires/nlp',
		'/en/seminaires/public-governance',
		'/fr/seminaires/public-governance'
	],
	'seminar': [
		'/en/seminaires/nlp',
		'/fr/seminaires/nlp',
		'/en/seminaires/public-governance',
		'/fr/seminaires/public-governance'
	]
};

/**
 * Get paths to revalidate based on Strapi content type and entry data
 */
function getPathsForContentType(
	contentType: string,
	entry?: { slug?: string; publishedAt?: string | null }
): string[] {
	const basePaths = CONTENT_TYPE_TO_PATHS[contentType] || [];
	const paths: string[] = [];

	// Add all language variants of base paths
	for (const basePath of basePaths) {
		for (const locale of Object.values(LOCALES)) {
			// Replace language prefix if it exists, or add it
			const localizedPath = basePath.startsWith('/en/') || basePath.startsWith('/fr/')
				? basePath.replace(/^\/(en|fr)\//, `/${locale}/`)
				: `/${locale}${basePath}`;
			paths.push(localizedPath);
		}
	}

	// If entry has a slug, add individual entry paths
	// Handle both 'slug' and 'Slug' (Strapi might use capitalized field names)
	const slug = entry?.slug || (entry as any)?.Slug;

	if (slug) {
		// Check if this is a post, author, or seminar content type
		if (contentType.includes('post') || contentType === 'post') {
			for (const locale of Object.values(LOCALES)) {
				paths.push(`/${locale}/blog/${slug}`);
			}
		} else if (contentType.includes('author') || contentType === 'author' || contentType.includes('team')) {
			for (const locale of Object.values(LOCALES)) {
				paths.push(`/${locale}/equipe/${slug}`);
			}
		}
	}

	// Always revalidate homepage since it shows recent content
	for (const locale of Object.values(LOCALES)) {
		if (!paths.includes(`/${locale}/`)) {
			paths.push(`/${locale}/`);
		}
	}

	return [...new Set(paths)]; // Remove duplicates
}

/**
 * Revalidate a single path by making a HEAD request
 * Vercel's ISR will detect this and regenerate the page
 */
async function revalidatePath(path: string, baseUrl: string): Promise<{
	path: string;
	success: boolean;
	status?: number;
	error?: string;
}> {
	try {
		const url = `${baseUrl}${path}`;

		// Make a HEAD request to trigger revalidation
		// Vercel's ISR will regenerate the page
		const response = await fetch(url, {
			method: 'HEAD',
			headers: {
				// This header can be used to bypass cache for revalidation
				'Cache-Control': 'no-cache',
				// Optional: Add a revalidation header
				'x-vercel-revalidate': '1'
			}
		});

		return {
			path,
			success: response.ok,
			status: response.status
		};
	} catch (err) {
		return {
			path,
			success: false,
			error: (err as Error).message
		};
	}
}

export const POST: RequestHandler = async ({ request, url }) => {
	try {
		// Verify the request is authenticated
		const authHeader = request.headers.get('authorization');
		const token = authHeader?.replace('Bearer ', '');

		if (!REVALIDATE_TOKEN || token !== REVALIDATE_TOKEN) {
			console.error('Revalidation attempt with invalid token');
			throw error(401, 'Unauthorized: Invalid token');
		}

		// Parse request body
		let body: {
			paths?: string[];
			model?: string; // Strapi content type
			entry?: {
				slug?: string;
				publishedAt?: string | null;
			};
		};

		try {
			body = await request.json();
		} catch {
			throw error(400, 'Invalid JSON in request body');
		}

		// Determine which paths to revalidate
		let pathsToRevalidate: string[];

		if (body.paths && Array.isArray(body.paths)) {
			// Explicit paths provided
			pathsToRevalidate = body.paths;
		} else if (body.model) {
			// Content type provided - auto-determine paths
			pathsToRevalidate = getPathsForContentType(body.model, body.entry);
		} else {
			throw error(400, 'Invalid request: Provide either "paths" array or "model" string');
		}

		if (pathsToRevalidate.length === 0) {
			return json({
				success: true,
				message: 'No paths to revalidate',
				revalidated: []
			});
		}

		// Get base URL for revalidation requests
		const baseUrl = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: url.origin;

		// Revalidate all paths concurrently
		console.log(`Revalidating ${pathsToRevalidate.length} paths:`, pathsToRevalidate);

		const results = await Promise.allSettled(
			pathsToRevalidate.map((path) => revalidatePath(path, baseUrl))
		);

		const successful: string[] = [];
		const failed: Array<{ path: string; error: string }> = [];

		for (const result of results) {
			if (result.status === 'fulfilled') {
				if (result.value.success) {
					successful.push(result.value.path);
				} else {
					failed.push({
						path: result.value.path,
						error: result.value.error || `HTTP ${result.value.status}`
					});
				}
			} else {
				failed.push({
					path: 'unknown',
					error: result.reason?.message || 'Unknown error'
				});
			}
		}

		return json({
			success: true,
			revalidated: successful,
			failed: failed.length > 0 ? failed : undefined,
			total: pathsToRevalidate.length,
			successful: successful.length
		});
	} catch (err) {
		console.error('Revalidation error:', err);

		// If it's already a SvelteKit error, re-throw it
		if ((err as any)?.status) {
			throw err;
		}

		throw error(500, `Revalidation failed: ${(err as Error).message}`);
	}
};

// Allow GET requests for testing (with token in query param)
export const GET: RequestHandler = async ({ url, request }) => {
	const token = url.searchParams.get('token');
	const path = url.searchParams.get('path') || '/en/';

	if (!REVALIDATE_TOKEN || token !== REVALIDATE_TOKEN) {
		throw error(401, 'Unauthorized');
	}

	const baseUrl = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: url.origin;

	const result = await revalidatePath(path, baseUrl);

	return json({
		success: result.success,
		path: result.path,
		status: result.status,
		error: result.error
	});
};

