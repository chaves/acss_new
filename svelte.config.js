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
		// Note: Global prerendering is disabled to allow ISR routes to work properly.
		// Routes with ISR config will use Incremental Static Regeneration (generated on-demand).
		// Static routes without ISR will be generated on-demand on Vercel (SSR/SSG).
		// If you need specific routes prerendered, add `export const prerender = true` to their +page.server.ts
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
