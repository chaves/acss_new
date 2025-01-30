<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { languageTag } from '$lib/paraglide/runtime.js';

	import SeminarItem from '$lib/components/seminars/SeminarItem.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import { Carousel } from 'flowbite-svelte';
	import images from '$lib/data/images.json';
</script>

<div class="mx-3 flex flex-wrap items-center">
	<div class="w-full px-3 lg:w-1/2">
		<div class="py-6">
			<div class="mx-auto mb-8 max-w-lg lg:mx-0 lg:max-w-md">
				<h1 class="mb-4 font-heading text-xl font-bold lg:text-2xl">
					Applied Computational Social Sciences<br />Data-Intensive Governance - PSL Institute
				</h1>

				{#if languageTag() == 'en'}
					<h2 class="mb-4 font-heading text-xl font-bold lg:text-2xl">
						Expertise in <span class="site_blue">social sciences</span> research coupled with
						<span class="site_red">data science</span> capabilities in order to:
					</h2>
					<ul class="ml-6 list-disc text-xl">
						<li>Increase the relevance of academic research to the challenges facing society</li>
						<li>Shed some light on governmental and private sectors decision-making</li>
						<li>Foster better collective governance</li>
					</ul>
				{:else}
					<h2 class="mb-4 font-heading text-xl font-bold lg:text-2xl">
						Une expertise de recherche en <span class="site_blue">sciences sociales</span>
						articulée avec des capacités en
						<span class="site_red">sciences des données</span> pour :
					</h2>
					<ul class="ml-6 list-disc text-xl">
						<li>
							Renforcer la pertinence de la recherche académique sur les grandes problématiques
							sociétales
						</li>
						<li>Eclairer la décision publique et privée</li>
						<li>Favoriser une meilleure gouvernance collective</li>
					</ul>
				{/if}
			</div>
			<div class="text-center lg:text-left"></div>
		</div>
	</div>
	<div class="lg:bg-blueGray-10 mb-12 mt-6 w-full px-3 pb-10 lg:mb-0 lg:w-1/2">
		<div class="max-w-4xl">
			<Carousel {images} duration={3000} imgClass="object-contain h-full w-fit rounded-sm" />
		</div>
	</div>
</div>
<div>
	{#if data.seminars.length > 0}
		{#if languageTag() == 'en'}
			<h2>Upcoming working group sessions</h2>
		{:else}
			<h2>Prochaines sessions des groupes de travail</h2>
		{/if}

		{#each data.seminars as seminar, index}
			<SeminarItem {seminar} {index} />
		{/each}
	{/if}
</div>

<style>
	ul li {
		@apply ml-6 mt-2 list-disc;
	}
	h2 {
		@apply mt-6 text-lg font-semibold;
	}

	.une {
		@apply rounded-2xl bg-white p-6 text-center;
	}
	.une h2 {
		@apply mt-0;
	}
</style>
