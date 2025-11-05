<script lang="ts">
	interface Props {
		data: Record<string, any>;
	}

	let { data }: Props = $props();

	// Ensure @context is always present
	const structuredData = {
		'@context': 'https://schema.org',
		...data
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}<\/script>`}
</svelte:head>

