<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let { data }: { data: PageData } = $props();
	const name = data.membre.first_name + ' ' + data.membre.last_name;
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<Breadcrumb
	title={name}
	title_path={name}
	fonction={data.membre.title}
	email={data.membre.email}
	link="membres"
	link_text={m.members()}
/>

{#if typeof data.membre === 'undefined'}
	<h1>Cette page n'existe pas.</h1>
{:else}
	<div class="mt-3 flex flex-wrap">
		<div
			class="order-0 md:order-0 wow animate__ animate__fadeIn animated mb-12 w-full px-3 pr-12 md:mb-0 md:w-1/3"
			data-wow-delay="1s"
			style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;"
		>
			<img
				class="w-80 rounded-xl object-cover shadow-md"
				src="/images/photos_members/{data.membre.photo}"
				alt={data.membre.last_name}
			/>
		</div>

		<div class="w-full px-3 text-sm md:w-2/3">
			<ul>
				{#each data.membre.affiliations as affiliation}
					<li>{affiliation}</li>
				{/each}
			</ul>

			<p class="mt-6 font-bold">MAIN RESEARCH AREAS:</p>
			<ul>
				{#each data.membre.main_areas as area}
					<li class="mt-1">{area}</li>
				{/each}
			</ul>

			{#if data.membre.initiatives.length > 0}
				<p class="mt-6 font-bold">RESEARCH PROJECTS/INITIATIVES:</p>
				<ul>
					{#each data.membre.initiatives as initiative}
						<li class="mt-1">{@html initiative}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<p class="mt-6 font-bold">SELECTED PUBLICATIONS:</p>
	<ul>
		{#each data.membre.selected_publications as publication}
			<li class="mb-3 mt-3">{@html publication}</li>
		{/each}
	</ul>
{/if}
