<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import Bruno from '$lib/components/equipe/Bruno.svelte';
	import Claire from '$lib/components/equipe/Claire.svelte';
	import Standard from '$lib/components/equipe/Standard.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	let { data }: { data: PageData } = $props();
	const name = data.membre.first_name + ' ' + data.membre.last_name;
</script>

<Breadcrumb
	title={name}
	title_path={name}
	fonction={data.membre.title}
	email={data.membre.email}
	link="equipe"
	link_text={m.team()}
/>

<div class="flex flex-wrap text-sm">
	{#if typeof data.membre === 'undefined'}
		<h1>Cette page n'existe pas.</h1>
	{:else}
		<div class="order-0 md:order-0 mb-12 w-full px-3 pr-12 md:w-1/3">
			<img
				class="w-80 rounded-xl object-cover shadow-md"
				src="/images/photos_equipe/{data.membre.photo}"
				alt={data.membre.last_name}
			/>
		</div>
		<div class="order-0 md:order-0 mb-12 w-full px-3 pr-12 md:w-2/3">
			{#if data.membre.slug == 'bruno-chaves-ferreira'}
				<Bruno />
			{:else if data.membre.slug == 'claire-dupre-la-tour'}
				<Claire />
			{:else}
				<Standard membre={data.membre} />
			{/if}
		</div>
	{/if}
</div>
