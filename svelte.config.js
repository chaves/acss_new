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
