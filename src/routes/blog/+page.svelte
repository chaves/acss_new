<script lang="ts">
	import type { PageData } from './$types';
	import PostItem from '$lib/components/layout/PostItem.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Breadcrumb title="Blog" title_path="blog" />

{#if data.posts.length > 0}
	{#each data.posts as post, index}
		<PostItem {post} {index} />
	{/each}
{:else}
	<p>No posts found</p>
{/if}
