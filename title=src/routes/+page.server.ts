import type { PageServerLoad } from './$types';

export const load = (async () => {
	const date = new Date().toISOString();
	const source = 'https://cms.acss-psl.eu/api/';

	// Build endpoints
	const url_seminars = `${source}seminars?filters[date][$gte]=${date}&sort=date:asc`;
	const url_posts = `${source}posts?filters[date][$gte]=${date}&sort=date:asc`;

	try {
		// Run both fetch requests concurrently
		const [seminarRes, postsRes] = await Promise.all([
			fetch(url_seminars),
			fetch(url_posts)
		]);

		// Check for errors in responses
		if (!seminarRes.ok) {
			throw new Error(`Failed to fetch seminars: ${seminarRes.status}`);
		}
		if (!postsRes.ok) {
			throw new Error(`Failed to fetch posts: ${postsRes.status}`);
		}

		// Parse both JSON responses concurrently
		const [seminarsJson, postsJson] = await Promise.all([
			seminarRes.json(),
			postsRes.json()
		]);

		return {
			seminars: seminarsJson.data,
			posts: postsJson.data
		};
	} catch (error) {
		// Log the error for debugging purposes.
		console.error('Error in load function:', error);
		// Return empty arrays in case of error
		return {
			seminars: [],
			posts: []
		};
	}
}) satisfies PageServerLoad;