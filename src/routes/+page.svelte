<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime.js';
	import Link from '$lib/components/Link.svelte';

	import SeminarItem from '$lib/components/layout/SeminarItem.svelte';
	import PostItem from '$lib/components/layout/PostItem.svelte';
	import SEO from '$lib/seo/SEO.svelte';
	import StructuredData from '$lib/seo/StructuredData.svelte';
	import { generateOrganizationSchema, generateWebSiteSchema } from '$lib/seo/schema-utils';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import { Carousel } from 'flowbite-svelte';
	import images from '$lib/data/images_home.json';

	const organizationSchema = generateOrganizationSchema();
	const websiteSchema = generateWebSiteSchema();
</script>

<SEO
	title="Institut ACSS-PSL : Applied Computational Social Sciences"
	description="Expertise in social sciences research coupled with data science capabilities to increase research relevance, inform decision-making, and foster better collective governance."
	type="website"
	url="/"
	locale={getLocale() === 'en' ? 'en_US' : 'fr_FR'}
	keywords="computational social sciences, data science, governance, PSL, research institute"
/>

<StructuredData data={organizationSchema} />
<StructuredData data={websiteSchema} />

<div class="mb-6 rounded-xl bg-blueGray-100 p-6">
	<div class="flex flex-col items-center gap-4 text-center md:flex-row md:gap-8 md:text-left">
		<img
			src="/images/visuels/Visuel_26-11-25.jpg"
			alt="ACSS Research Seminar"
			class="h-auto w-full rounded-lg md:w-64 md:flex-shrink-0"
		/>
		<div class="md:leading-24 text-lg leading-relaxed md:text-xl">
			<Link href="/seminaires/acss">ACSS Research seminar on LLMs in Finance</Link><br />to be held on
			Wednesday, November 26<sup>th</sup>
			2025 from 8:30 to 13:30<br />Campus de l'Estrapade de PSL - 16 bis rue de l'Estrapade 75005
			Paris
		</div>
	</div>
</div>
<div class="mx-3 grid grid-cols-12 gap-6 pb-6">
	<div class="col-span-12 rounded-xl bg-white p-6 lg:col-span-6">
		<h1>
			Applied Computational Social Sciences<br />Data-Intensive Governance - PSL Institute
		</h1>

		{#if getLocale() == 'en'}
			<h2 class="text-md mb-4 font-heading font-bold lg:text-xl">
				Expertise in <span class="site_blue">social sciences</span> research coupled with
				<span class="site_red">data science</span> capabilities in order to:
			</h2>
			<ul class="ml-6 list-disc text-xl">
				<li>Increase the relevance of academic research to the challenges facing society</li>
				<li>Shed some light on governmental and private sectors decision-making</li>
				<li>Foster better collective governance</li>
			</ul>
		{:else}
			<h2 class="text-md mb-4 font-heading font-bold lg:text-xl">
				Une expertise de recherche en <span class="site_blue">sciences sociales</span>
				articulée avec des capacités en
				<span class="site_red">sciences des données</span> pour :
			</h2>
			<ul class="text-md ml-6 list-disc">
				<li>
					Renforcer la pertinence de la recherche académique sur les grandes problématiques
					sociétales
				</li>
				<li>Eclairer la décision publique et privée</li>
				<li>Favoriser une meilleure gouvernance collective</li>
			</ul>
		{/if}
	</div>
	<div class="col-span-12 rounded-xl bg-blueGray-100 p-6 lg:col-span-6">
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

<div class="mx-3 grid grid-cols-12 gap-6 pb-6">
	<div class="col-span-12 rounded-xl bg-blueGray-100 p-6 text-center lg:col-span-8">
		{#if data.seminars.length > 0}
			{#if getLocale() == 'en'}
				<h2>Upcoming working group sessions</h2>
			{:else}
				<h2>Prochaines sessions des groupes de travail</h2>
			{/if}

			{#each data.seminars as seminar, index}
				<SeminarItem {seminar} {index} abstract={false} />
			{/each}
		{/if}
	</div>
	<div class="col-span-12 rounded-xl bg-white p-6 lg:col-span-4">
		<Carousel {images} duration={3000} imgClass="object-contain h-full w-fit rounded-lg" />
	</div>
</div>

<style>
	h1 {
		@apply mb-4 font-heading font-bold lg:text-xl;
	}
	ul li {
		@apply ml-6 mt-2 list-disc;
	}
	h2 {
		@apply mt-6 text-lg font-semibold;
	}
</style>
