import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			// Enable edge functions for faster response times
			runtime: 'nodejs20.x',
			// Configure regions for optimal performance
			regions: ['cdg1'], // Paris region for EU traffic
			// ISR configuration - useful for semi-static pages
			isr: {
				// Cache invalidation time in seconds (1 hour)
				expiration: 3600
			}
		}),
		prerender: {
			//Needed for correctly prerendering <link rel="alternate" hreflang="x" href="y">
			origin: 'https://acss-dig.psl.eu',
			// Crawl all links to discover pages
			crawl: true,
			// Prerender these pages for better initial performance
			entries: [
				'*',
				'/en',
				'/fr',
				'/en/mission',
				'/fr/mission',
				'/en/plateforme',
				'/fr/plateforme',
				'/en/partenariats',
				'/fr/partenariats'
			]
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
