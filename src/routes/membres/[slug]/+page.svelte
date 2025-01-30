<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

{#if typeof data.membre === 'undefined'}
	<h1>Cette page n'existe pas.</h1>
{:else}
	<div class="flex flex-wrap mt-3">
		<div
			class="w-full md:w-1/3 pr-12 px-3 order-0 md:order-0 mb-12 md:mb-0 wow animate__ animate__fadeIn animated"
			data-wow-delay="1s"
			style="visibility: visible; animation-delay: 0.5s; animation-name: fadeIn;"
		>
			<img
				class="object-cover rounded-xl w-80 shadow-md"
				src="/images/photos_members/{data.membre.photo}"
				alt={data.membre.last_name}
			/>
		</div>

		<div class="w-full md:w-2/3 px-3 text-sm">
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
			<li class="mt-3 mb-3">{@html publication}</li>
		{/each}
	</ul>
{/if}
