<script lang="ts">
	interface Props {
		data: Record<string, any>;
	}

	let { data }: Props = $props();

	// Ensure @context is always present
	const structuredData = $derived({
		'@context': 'https://schema.org',
		...data
	});

	// Escape "<" so CMS text containing a closing script tag can't end the tag and inject markup.
	// < is still parsed as "<" by JSON consumers.
	const json = $derived(JSON.stringify(structuredData).replace(/</g, '\\u003c'));
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}<\/script>`}
</svelte:head>

