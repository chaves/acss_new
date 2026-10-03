<script lang="ts">
	import SEO from '#lib/seo/SEO.svelte';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { generateCollectionPageSchema } from '#lib/seo/schema-utils.js';
	import type { PageProps } from './$types';
	import * as m from '#lib/paraglide/messages.js';
	import SeminarItem from '#lib/components/layout/SeminarItem.svelte';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import WorkshopInfo from '#lib/components/layout/WorkshopInfo.svelte';

	let { data }: PageProps = $props();
</script>

<SEO title="Institut ACSS-PSL : {m.public_governance()}" description={m.seo_seminars_description()} />
<StructuredData
	data={generateCollectionPageSchema({
		name: m.public_governance(),
		description: m.seo_seminars_description(),
		url: '/seminaires/public-governance',
		items: [...data.seminars_upcoming, ...data.seminars_past]
			.filter((seminar) => seminar.slug)
			.map((seminar) => ({ name: seminar.title, url: `/seminaires/public-governance/${seminar.slug}` }))
	})}
/>

<Breadcrumb
	title={m.public_governance()}
	title_path="Public Governance"
	link="seminaires"
	link_text={m.seminars()}
/>

<WorkshopInfo type="pub" variant="card" />

{#if data.seminars_upcoming.length > 0}
	<h2>Upcoming sessions</h2>

	<div class="sessions-grid">
		{#each data.seminars_upcoming as seminar, index}
			<SeminarItem {seminar} {index} type="pub" abstract={false} />
		{/each}
	</div>
{/if}

{#if data.seminars_past.length > 0}
	<h2 class="past-title">Past sessions</h2>

	<div class="sessions-grid">
		{#each data.seminars_past as seminar, index}
			<SeminarItem {seminar} {index} type="pub" abstract={false} />
		{/each}
	</div>
{/if}

<style lang="postcss">
	h2 {
		@apply text-lg font-semibold;
	}

	h2.past-title {
		@apply mt-10;
	}

	.sessions-grid {
		@apply grid gap-3;
	}
</style>
