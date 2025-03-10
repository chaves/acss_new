<script lang="ts">
	import type { PageProps } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let { data }: PageProps = $props();
</script>

<Breadcrumb title={m.seminaire_nlp()} title_path="NLP" link="seminaires" link_text={m.seminars()} />

<svelte:head>
	<title>Institut PSL-ACSS : NLP working group</title>
	<meta
		name="description"
		content="L’Institut constitue une plateforme pour les chercheurs de PSL dont l’objectif fondamental
				est de permettre une mutualisation ciblée de ressources."
	/>
</svelte:head>

<div class="description">
	<p>
		The aim of this workshop is to promote technical and practical exchanges between researchers who
		use NLP methods. There is no hesitation in detailing the code (r/python), sharing tips, and
		discovering new methods and models.
	</p>

	<p>Periodicity: Every other Thursday from 12h15 to 13h30, by videoconference.</p>

	<strong>
		To attend, please fill the form:
		<a href="https://forms.gle/f9yfq5nxUYcbQdkT6">https://forms.gle/f9yfq5nxUYcbQdkT6</a>
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
