<script lang="ts">

	import * as m from '$lib/paraglide/messages.js';

	let { authors } = $props();

</script>

{m.by()}
{#each authors as author, index}
	<span class="mr-3">
		<a class="font-normal" href="/equipe/{author.Slug}">{author.FirstName} {author.LastName}</a>
		{#if index < authors.length - 1}
			,
		{/if}
	</span>
{/each}


