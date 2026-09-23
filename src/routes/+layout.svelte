<script lang="ts">
	import type { LayoutProps } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { getLocale, setLocale, locales, baseLocale } from '$lib/paraglide/runtime.js';
	import '../app.css';

	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children }: LayoutProps = $props();

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

	const BASE_URL = 'https://acss-dig.psl.eu';

	// Path with the locale segment stripped, so we can rebuild it per language.
	const pathWithoutLocale = $derived.by(() => {
		const segments = $page.url.pathname.split('/').filter(Boolean);
		if (segments.length && locales.includes(segments[0] as any)) {
			segments.shift();
		}
		return segments.length ? `/${segments.join('/')}` : '';
	});

	// rel="alternate" targets for every locale, plus x-default pointing at the base locale.
	const alternates = $derived(
		locales.map((locale) => ({
			hreflang: locale,
			href: `${BASE_URL}/${locale}${pathWithoutLocale}`
		}))
	);
</script>

<svelte:head>
	{#each alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={`${BASE_URL}/${baseLocale}${pathWithoutLocale}`} />
</svelte:head>

<!-- Header / Navigation -->
<Navigation lang={currentLocale} />

<!-- Main Content Area -->
<main id="main-content" class="main-content">
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
		padding: clamp(1.5rem, 4vw, 3.5rem) 0 2rem;
		background: var(--bg-primary);
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
		max-width: var(--content-max);
		padding-inline: clamp(1rem, 3vw, 2rem);
	}
</style>
