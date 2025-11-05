import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),
		prerender: {
			//Needed for correctly prerendering <link rel="alternate" hreflang="x" href="y">
			origin: 'https://acss-dig.psl.eu',
			// Crawl all links to discover pages automatically
			crawl: true,
			// Start from root - Paraglide will handle language routing
			entries: ['*']
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
