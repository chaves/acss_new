<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import { marked } from 'marked';
	let { data }: { data: PageData } = $props();
	let membre = data.membre[0];
	const name = membre.FirstName + ' ' + membre.LastName;
	// Convert the Markdown biography to HTML.
	const biographyHtml = marked(membre.biography);
</script>

<Breadcrumb
	title={name}
	title_path={name}
	fonction={membre.fonction}
	email={membre.email}
	link="equipe"
	link_text={m.team()}
/>

<div class="flex flex-wrap text-sm">
	{#if typeof membre === 'undefined'}
		<h1>Cette page n'existe pas.</h1>
	{:else}
		<div class="order-0 md:order-0 mb-12 w-full px-3 pr-12 md:w-1/3">
			<img
				class="w-80 rounded-xl object-cover shadow-md"
				src="/images/photos_equipe/{membre.ImageFileName}"
				alt={membre.LastName}
			/>
		</div>
		<div class="equipe-bio order-0 md:order-0 mb-12 w-full px-3 pr-12 md:w-2/3">
			{@html biographyHtml}
		</div>
	{/if}
</div>

<style>


</style>
