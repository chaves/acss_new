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

<!--Header-->

<Navigation lang={currentLocale} />

<section class="py-9 bg-blueGray-50">
	<div class="container main">
		<div class="mx-auto mb-6">
			{@render children()}
		</div>
	</div>
</section>

<Footer />
