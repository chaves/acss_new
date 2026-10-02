import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: [vitePreprocess()],
			extensions: ['.svelte', '.svx'],
			adapter: adapter(),
			paths: {
				// Only set absolute assets path in production (Vercel will set VERCEL env var)
				assets: process.env.VERCEL ? 'https://acss-dig.psl.eu' : '',
				base: '',
				relative: false,
				origin: 'https://acss-dig.psl.eu'
			},
			prerender: {
				crawl: true,
				entries: ['*', '/fr/candidate', '/en/candidate'],
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
		}),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' }),
		// Custom plugin to handle language-prefixed static assets in dev mode
		{
			name: 'handle-static-assets',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					// Strip language prefix from static asset requests
					if (req.url && /^\/(en|fr)\/(images|files)\//.test(req.url)) {
						req.url = req.url.replace(/^\/(en|fr)\//, '/');
					}
					next();
				});
			}
		}
	],
	server: {
		fs: {
			// Allow serving files from the static directory
			strict: false
		}
	},
	build: {
		cssMinify: 'lightningcss',
		cssCodeSplit: true,
		rolldownOptions: {
			output: {
				manualChunks: undefined
			},
			// Suppress sourcemap warnings from third-party libraries
			onwarn(warning, warn) {
				// Ignore sourcemap warnings from node_modules (flowbite-svelte, etc.)
				if (warning.code === 'SOURCEMAP_ERROR' && warning.message.includes('node_modules')) {
					return;
				}
				// Log other warnings
				warn(warning);
			}
		}
	}
});
