import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	build: {
		cssMinify: 'lightningcss',
		cssCodeSplit: true,
		minify: 'esbuild',
		rollupOptions: {
			output: {
				manualChunks: undefined
			}
		}
	}
});
