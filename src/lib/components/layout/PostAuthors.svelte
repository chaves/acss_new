<script lang="ts">
	import { localizeUrl } from '#lib/utils.js';

	import * as m from '#lib/paraglide/messages.js';

	let { authors } = $props();

</script>

{#if authors?.length}
	{m.by()}
	{#each authors as author, index}
		<span class="mr-3">
			{#if author.type === 'acss_engineer'}
				<a class="font-normal" href={localizeUrl(`/equipe/${author.Slug}`)}>{author.FirstName} {author.LastName}</a>
			{:else if author.homepage}
				<a class="font-normal" href={author.homepage} target="_blank" rel="noopener">{author.FirstName} {author.LastName}</a>
			{:else}
				{author.FirstName} {author.LastName}
			{/if}
			{#if index < authors.length - 1}
				,
			{/if}
		</span>
	{/each}
{/if}


