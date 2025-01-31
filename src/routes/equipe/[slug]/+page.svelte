<script lang="ts">
    import type { PageData } from './$types';
    import Bruno from '$lib/components/equipe/Bruno.svelte';
    import Claire from '$lib/components/equipe/Claire.svelte';
    import Standard from '$lib/components/equipe/Standard.svelte';
    import BeradcrumbTeam from '$lib/components/layout/BeradcrumbTeam.svelte';
    let { data }: { data: PageData } = $props();
</script>

<BeradcrumbTeam name={data.membre.last_name} title={data.membre.title} email={data.membre.email} />

<div class="flex flex-wrap text-sm">
	{#if typeof data.membre === 'undefined'}
		<h1>Cette page n'existe pas.</h1>
	{:else}
		<div class="w-full md:w-1/3 pr-12 px-3 order-0 md:order-0 mb-12">
			<img
				class="object-cover rounded-xl w-80 shadow-md"
				src="/images/photos_equipe/{data.membre.photo}"
				alt={data.membre.last_name}
			/>
		</div>
		<div class="w-full md:w-2/3 pr-12 px-3 order-0 md:order-0 mb-12">
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
