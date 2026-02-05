import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),
		paths: {
			// Only set absolute assets path in production (Vercel will set VERCEL env var)
			assets: process.env.VERCEL ? 'https://acss-dig.psl.eu' : '',
			base: ''
		},
		prerender: {
			origin: 'https://acss-dig.psl.eu',
			crawl: true,
			entries: ['*'],
			// Handle 404s gracefully during prerendering (e.g., deleted team members linked from Strapi content)
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for team member pages - they might be linked from old content
				if (path.startsWith('/equipe/') || path.startsWith('/membres/')) {
					console.warn(`Ignoring 404 for ${path} (linked from ${referrer})`);
					return;
				}
				// Ignore 404s for dynamic seminar detail pages (SSR only, not prerendered)
				if (path.match(/\/seminaires\/(nlp|public-governance)\/[^/]+$/)) {
					console.warn(`Skipping prerender for dynamic seminar page ${path}`);
					return;
				}
				// Throw error for other 404s
				throw new Error(message);
			}
		},
		csp: {
			mode: 'auto',
			directives: {
				'script-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:', 'https://cms.acss-psl.eu']
			}
		}
	},

	extensions: ['.svelte', '.svx']
};

export default config;
