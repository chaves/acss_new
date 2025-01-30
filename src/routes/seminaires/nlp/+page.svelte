<script lang="ts">
    import type { PageProps } from './$types';

    import SeminarItem from '$lib/components/seminars/SeminarItem.svelte';

    let { data }: PageProps = $props();

</script>

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
		The aim of this seminar is to promote technical and practical exchanges between researchers who
		use NLP methods. There is no hesitation in detailing the code (r/python), sharing tips, and
		discovering new methods and models.
	</p>

	<p>Periodicity: Every other Thursday from 12h15 to 13h30, by videoconference.</p>

	<em
		>To attend, please contact:
		<a href="mailto:christophe.benavent@gmail.com">christophe.benavent@gmail.com</a></em
	>
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
		@apply bg-white py-3 px-6 rounded-xl text-sm mb-6 border-2 border-blue-100;
	}

	p {
		@apply my-2;
	}

	h2 {
		@apply text-lg font-semibold;
	}
</style>