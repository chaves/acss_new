<script lang="ts">
	import seminar_options from '$lib/data/seminars_options.json';
	import Link from '$lib/components/Link.svelte';
	import { getAlternatingClass } from '$lib/helpers/ui';
	import type { Seminar } from '$lib/types';

	interface Props {
		seminar: Seminar;
		index: number;
		type?: 'all' | 'specific';
		abstract?: boolean;
	}

	let { seminar, index, type = 'all', abstract = true }: Props = $props();

	let seminarOption = $derived(seminar_options.find((s) => s.value === seminar.type));
	let title = $derived(seminarOption?.name ?? '');
	let url = $derived(seminarOption?.url ?? '');
	let itemClass = $derived(getAlternatingClass(index));
</script>

<div class="{itemClass} main">
	<p>
		<strong>{seminar.date} at {seminar.time.slice(0, 5)}h</strong>
		{#if type == 'all'}
			- <em><Link href="/seminaires/{url}">{title}</Link></em>
		{/if}
	</p>
	{#if seminar.homepage}
		<p><a href={seminar.homepage}>{seminar.presenter}</a></p>
	{:else}
		<p>{seminar.presenter}</p>
	{/if}

	<p class="italic">{seminar.title}</p>

	{#if abstract && seminar.abstract}
		<p class="ml-3 mt-2 border-l-4 border-gray-200 pl-3 text-justify text-sm">
			<strong>Abstract</strong>: {seminar.abstract}
		</p>
	{/if}
</div>

<style>
	.main {
		@apply my-3 w-full rounded-lg p-3;
	}

	.even {
		@apply bg-white;
	}

	.odd {
		@apply bg-blueGray-100;
	}
</style>
