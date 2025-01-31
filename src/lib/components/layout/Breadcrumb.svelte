<script lang="ts">
	let { title, title_path, link = undefined, link_text = undefined, email = undefined, fonction = undefined } = $props();
	import * as m from '$lib/paraglide/messages.js';
</script>

<section class="mb-6 rounded-xl bg-blueGray-100 py-3">
	<div class="container text-center">
		<h1 class="mb-5 text-2xl font-bold lg:text-3xl">
			{@html title}
		</h1>
		{#if fonction !== undefined}
			{fonction}
		{/if}
		{#if email !== undefined}
			<p class="text-sm text-blue-500">
				<a href="maito:{email}">{email}</a>
			</p>
		{/if}
		<ul class="mx-auto text-sm text-gray-500 lg:text-sm">
			<li class="inline-flex items-center">
				<a href="/" class="text-gray-800 hover:text-blue-500">{m.home()}</a>
				<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-auto text-gray-300">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>
			{#if link !== undefined}
				<li class="inline-flex items-center">
					<a href="/formation" class="hover:text-blue-500 text-gray-800">{link_text}</a>
					<svg fill="currentColor" viewBox="0 0 20 20" class="h-5 w-auto text-gray-300">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</li>

			<li class="inline-flex items-center text-gray-400">
				<span>{title_path}</span>
			</li>
		</ul>
	</div>
</section>
