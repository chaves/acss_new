<script lang="ts">
	import Link from '$lib/components/Link.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<svelte:head>
	<title>Databases</title>
	<meta name="description" content="ACSS-PSL Institute databases" />
</svelte:head>

<Breadcrumb title="Databases" title_path="Databases" />

<ul>
	<li>
		<Link href="/donnees/credit_series">Measuring credit procyclicality</Link>
	</li>
</ul>

<style>
	ul li {
		@apply my-3 ml-9 list-disc;
	}
</style>
