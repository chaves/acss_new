<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let { data }: PageProps = $props();
</script>

<Breadcrumb
	title={m.public_governance()}
	title_path="Public Governance"
	link="seminaires"
	link_text={m.seminars()}
/>

<div class="description">
	<p>
		The Public Governance workshop is an online seminar series focused on state of art research in
		political economy that uses non-traditional data and data-intensive methods.
	</p>
	<p>
		The workshop gives a platform for the research on the role of governance in designing and
		developing better policies. Key features are the political environment, the role of the media,
		the engagement of stakeholders such as civil society and firms, the market structure and level
		of competition, and the independence of public regulators, among others. Particular emphasis is
		placed on research with NLP methods due to the proven usefulness of transforming text into data
		for further econometric analysis.
	</p>
	<p>Periodicity: Every Monday from 17h30 to 19h.</p>
	<p>
		To attend, please contact <strong>Vladimir Avetian:</strong>
		<strong
			><em
				><a href="mailto:vladimir.avetian@dauphine.psl.eu">vladimir.avetian@dauphine.psl.eu</a></em
			></strong
		>
		and <strong>Edgar Jimenez Bedolla</strong>
		<strong
			><em
				><a href="mailto:edgar.jimenez-bedolla@dauphine.psl.eu"
					>edgar.jimenez-bedolla@dauphine.psl.eu</a
				></em
			></strong
		>
	</p>
</div>

{#if data.seminars_upcoming.length > 0}
	<h2>Upcoming sessions</h2>

	{#each data.seminars_upcoming as seminar, index}
		<SeminarItem {seminar} {index} type="pub" />
	{/each}
{/if}

{#if data.seminars_past.length > 0}
	<h2>Past sessions</h2>

	{#each data.seminars_past as seminar, index}
		<SeminarItem {seminar} {index} type="pub" />
	{/each}
{/if}

<style>
	.description {
		@apply mb-6 rounded-xl border-2 border-blue-100 bg-white px-6 py-3 text-sm;
	}

	p {
		@apply my-2;
	}

	h2 {
		@apply text-lg font-semibold;
	}
</style>
