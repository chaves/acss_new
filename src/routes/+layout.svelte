<script lang="ts">
	import type { LayoutProps } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { getLocale, setLocale, locales, baseLocale } from '$lib/paraglide/runtime.js';
	import '../app.css';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { data, children }: LayoutProps = $props();

	// Update locale when URL changes (client-side navigation)
	$effect(() => {
		if (browser) {
			const pathname = $page.url.pathname;
			const [, lang] = pathname.split('/');
			const newLocale = locales.includes(lang as any) ? lang : baseLocale;

			// Only set if different to avoid unnecessary updates
			if (getLocale() !== newLocale) {
				setLocale(newLocale as any);
			}
		}
	});

	// Make locale reactive
	let currentLocale = $derived(getLocale());
</script>

<!-- Header / Navigation -->
<Navigation lang={currentLocale} />

<!-- Main Content Area -->
<main class="main-content">
	<div class="content-pattern"></div>
	<div class="container main">
		<div class="mx-auto">
			{@render children()}
		</div>
	</div>
</main>

<!-- Footer -->
<Footer />

<style>
	.main-content {
		position: relative;
		min-height: calc(100vh - 200px);
		padding: 2.5rem 0 1rem 0;
		background: linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);
	}

	.content-pattern {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(74, 108, 170, 0.03) 1px, transparent 1px);
		background-size: 24px 24px;
		pointer-events: none;
	}

	.container {
		position: relative;
		z-index: 1;
	}
</style>
