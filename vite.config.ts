import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
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
		minify: 'esbuild',
		rollupOptions: {
			output: {
				manualChunks: undefined
			},
			// Suppress sourcemap warnings from third-party libraries
			onwarn(warning, warn) {
				// Ignore sourcemap warnings from node_modules (flowbite-svelte, etc.)
				if (
					warning.code === 'SOURCEMAP_ERROR' &&
					warning.message.includes('node_modules')
				) {
					return;
				}
				// Log other warnings
				warn(warning);
			}
		}
	}
});
