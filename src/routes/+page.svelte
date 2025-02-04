<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { languageTag } from '$lib/paraglide/runtime.js';

	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import PostItem from '$lib/components/layout/PostItem.svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import { Carousel } from 'flowbite-svelte';
	import images from '$lib/data/images_home.json';

</script>

<div class="mx-3 pb-6 grid grid-cols-12 gap-6">

	<div class="col-span-12 lg:col-span-6 bg-white rounded-xl p-6">
		<h1>
			Applied Computational Social Sciences<br />Data-Intensive Governance - PSL Institute
		</h1>

		{#if languageTag() == 'en'}
		<h2 class="mb-4 font-heading text-md font-bold lg:text-xl">
			Expertise in <span class="site_blue">social sciences</span> research coupled with
			<span class="site_red">data science</span> capabilities in order to:
		</h2>
		<ul class="ml-6 list-disc text-xl">
			<li>Increase the relevance of academic research to the challenges facing society</li>
			<li>Shed some light on governmental and private sectors decision-making</li>
			<li>Foster better collective governance</li>
		</ul>
	{:else}
		<h2 class="mb-4 font-heading text-md font-bold lg:text-xl">
			Une expertise de recherche en <span class="site_blue">sciences sociales</span>
			articulée avec des capacités en
			<span class="site_red">sciences des données</span> pour :
		</h2>
		<ul class="ml-6 list-disc text-md">
			<li>
				Renforcer la pertinence de la recherche académique sur les grandes problématiques
				sociétales
			</li>
			<li>Eclairer la décision publique et privée</li>
			<li>Favoriser une meilleure gouvernance collective</li>
		</ul>
	{/if}

	</div>
	<div class="col-span-12 lg:col-span-6 bg-blueGray-100 rounded-xl p-6">
		<h1>Blog</h1>
		{#if data.posts.length > 0}
			{#each data.posts as post, index}
				<PostItem {post} {index} />
			{/each}
		{:else}
			<p>No posts found</p>
		{/if}
	</div>
</div>


<div class="mx-3 pb-6 grid grid-cols-12 gap-6">
	<div class="col-span-12 lg:col-span-8 bg-blueGray-100 rounded-xl p-6 text-center">

		{#if data.seminars.length > 0}
		{#if languageTag() == 'en'}
			<h2>Upcoming working group sessions</h2>
		{:else}
			<h2>Prochaines sessions des groupes de travail</h2>
		{/if}

		{#each data.seminars as seminar, index}
			<SeminarItem {seminar} {index} abstract={false} />
		{/each}
	{/if}

	</div>
	<div class="col-span-12 lg:col-span-4 bg-white rounded-xl p-6">
		<Carousel {images} duration={3000} imgClass="object-contain h-full w-fit rounded-lg" />
	</div>
</div>

<style>

	h1 {
		@apply mb-4 font-heading font-bold lg:text-xl
	}
	ul li {
		@apply ml-6 mt-2 list-disc;
	}
	h2 {
		@apply mt-6 text-lg font-semibold;
	}
</style>
