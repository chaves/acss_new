<script lang="ts">
	import SEO from '$lib/seo/SEO.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import Link from '$lib/components/Link.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
</script>

<SEO title="Institut ACSS-PSL : Databases" description={m.seo_data_description()} />

<Breadcrumb title="Databases" title_path="Databases" />

<ul>
	<li>
		<Link href="/donnees/credit_series">Measuring credit procyclicality</Link>
	</li>
</ul>

<style lang="postcss">
	ul li {
		@apply my-3 ml-9 list-disc;
	}
</style>
