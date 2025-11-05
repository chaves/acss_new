<script lang="ts">
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
		image = '/favicon.png',
		url = '',
		author = 'ACSS-PSL Institute',
		publishedTime,
		modifiedTime,
		locale = 'fr_FR',
		keywords = '',
		canonical = '',
		noindex = false
	}: Props = $props();

	// Build full URLs
	const baseUrl = 'https://acss-dig.psl.eu';
	const fullUrl = canonical || (url ? `${baseUrl}${url}` : baseUrl);
	const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
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
	<meta property="og:locale" content={locale} />
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
	<meta name="language" content={locale.split('_')[0]} />
</svelte:head>

