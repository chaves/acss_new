<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import WorkshopInfo from '$lib/components/layout/WorkshopInfo.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Institut ACSS-PSL : Public Governance workshop</title>
</svelte:head>

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

<style>
	h2 {
		@apply text-lg font-semibold;
	}

	h2.past-title {
		@apply mt-10;
	}

	.sessions-grid {
		@apply grid gap-3 md:grid-cols-2;
	}
</style>
