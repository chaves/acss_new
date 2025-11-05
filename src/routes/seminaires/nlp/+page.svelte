<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Institut ACSS-PSL : {m.seminaire_nlp()}</title>
</svelte:head>

<Breadcrumb title={m.seminaire_nlp()} title_path="NLP" link="seminaires" link_text={m.seminars()} />

<div class="description">
	<p>
		The aim of this workshop is to promote technical and practical exchanges between researchers who
		use NLP methods. There is no hesitation in detailing the code (r/python), sharing tips, and
		discovering new methods and models.
	</p>

	<p>Periodicity: on Thursdays from 12h15 to 13h30, by videoconference.</p>

	<strong>
		To attend, <a href="https://forms.gle/f9yfq5nxUYcbQdkT6">please fill the form</a>.
	</strong>
</div>

{#if data.seminars_upcoming.length > 0}
	<h2>Upcoming sessions</h2>

	{#each data.seminars_upcoming as seminar, index}
		<SeminarItem {seminar} {index} type="nlp" />
	{/each}
{/if}

{#if data.seminars_past.length > 0}
	<h2>Past sessions</h2>

	{#each data.seminars_past as seminar, index}
		<SeminarItem {seminar} {index} type="nlp" />
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
