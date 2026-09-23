<script lang="ts">
	import { page } from '$app/stores';
	import { getLocale } from '$lib/paraglide/runtime';
	import { pageUrl } from './schema-utils';

	interface Props {
		title: string;
		description: string;
		type?: 'website' | 'article';
		image?: string;
		url?: string;
		author?: string;
		publishedTime?: string;
		modifiedTime?: string;
		locale?: string;
		keywords?: string;
		canonical?: string;
		noindex?: boolean;
	}

	let {
		title,
		description,
		type = 'website',
		image = '/images/logos/acss_logo.svg',
		url = '',
		author = 'ACSS-PSL Institute',
		publishedTime,
		modifiedTime,
		locale,
		keywords = '',
		canonical = '',
		noindex = false
	}: Props = $props();

	// Build full URLs. Without an explicit url/canonical, fall back to the current
	// route so every page gets a correct canonical without repeating it by hand.
	// pageUrl adds the locale prefix, which keeps the canonical identical to the
	// URLs used in the JSON-LD and avoids canonicalising to a redirect.
	const baseUrl = 'https://acss-dig.psl.eu';
	const fullUrl = $derived(canonical || pageUrl(url || $page.url.pathname));
	const fullImageUrl = $derived(image.startsWith('http') ? image : `${baseUrl}${image}`);

	// Open Graph wants a territory-qualified locale; derive it from the active language.
	const ogLocale = $derived(locale ?? (getLocale() === 'en' ? 'en_GB' : 'fr_FR'));
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}
	{#if noindex}
		<meta name="robots" content="noindex,nofollow" />
	{:else}
		<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
	{/if}
	<meta name="author" content={author} />

	<!-- Canonical URL -->
	<link rel="canonical" href={fullUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:site_name" content="ACSS-PSL Institute" />
	{#if type === 'article'}
		{#if author}
			<meta property="article:author" content={author} />
		{/if}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={fullUrl} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={fullImageUrl} />

	<!-- Additional Meta Tags -->
	<meta name="language" content={ogLocale.split('_')[0]} />
</svelte:head>

