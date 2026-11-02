<script lang="ts">
	import SEO from '#lib/seo/SEO.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import Link from '#lib/components/Link.svelte';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
</script>

<SEO title="Institut ACSS-PSL : Databases" description={m.seo_data_description()} />

<Breadcrumb title="Databases" title_path="Databases" />

<ul class="data-links">
	<li>
		<Link href="/donnees/credit_series">Measuring credit procyclicality <span aria-hidden="true">→</span></Link>
	</li>
</ul>

<style>
	.data-links {
		max-width: var(--reading-max);
	}

	.data-links li {
		border-bottom: 1px solid rgba(74, 108, 170, 0.16);
	}

	.data-links :global(a) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 4rem;
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
	}
</style>
