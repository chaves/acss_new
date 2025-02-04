<script lang="ts">
	import seminar_options from '$lib/data/seminars_options.json';

	let { seminar, index, type = 'all', abstract = true } = $props();

	const title = seminar_options.filter((s) => s.value === seminar.type)[0].name;
	const url = seminar_options.filter((s) => s.value === seminar.type)[0].url;

	function get_class(number: number) {
		if (number % 2 == 0) {
			return 'even';
		} else {
			return 'odd';
		}
	}
</script>

<div class="{get_class(index)} main">
	<p>
		<strong>{seminar.date} at {seminar.time.slice(0, 5)}h</strong>
		{#if type == 'all'}
			- <em><a href="/seminaires/{url}">{title}</a></em>
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
