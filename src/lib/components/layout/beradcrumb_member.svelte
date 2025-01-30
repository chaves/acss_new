<script>
	import { t, locale } from 'svelte-intl-precompile';
	export let name;
	export let disciplines;
	export let homepage;
	export let twitter;
</script>

<section class="py-3 mb-6 bg-blueGray-100 rounded-xl">
	<div class="container text-center">
		<h1 class="text-2xl lg:text-3xl font-bold wow animate__animated animate__fadeInUp animated">
			{@html name}
		</h1>
		<p class="text-blue-500 text-sm">
			<a href={homepage} target="_blank">homepage</a>
			{#if twitter !== undefined}
				- <a href="https://twitter.com/{twitter}" target="_blank"
					><img class="inline-block" src="/images/icons/twitter-blue.svg" alt="twitter" /></a
				>
			{/if}
		</p>
		<ul class="mt-2">
			{#each disciplines as discipline}
				<li>{discipline}</li>
			{/each}
		</ul>

		<ul
			class="mx-auto text-gray-500 text-sm mt-5 lg:text-sm wow animate__animated animate__fadeInUp animated"
		>
			<li class="inline-flex items-center">
				<a href="/{$locale}" class="hover:text-blue-500 text-gray-800">{$t('home')}</a>
				<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-auto text-gray-300">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
			<li class="inline-flex items-center">
				<a href="/{$locale}/membres" class="hover:text-blue-500 text-gray-800">{$t('members')}</a>
				<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-auto text-gray-300">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
			<li class="inline-flex items-center text-gray-400">
				<span>{name}</span>
			</li>
		</ul>
	</div>
</section>
