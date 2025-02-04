<script lang="ts">
	import type { PageData } from './$types';
	import PostItem from '$lib/components/layout/PostItem.svelte';
	let { data }: { data: PageData } = $props();
</script>

{#if data.posts.length > 0}
	{#each data.posts as post, index}
		<PostItem {post} {index} />
	{/each}
{:else}
	<p>No posts found</p>
{/if}
