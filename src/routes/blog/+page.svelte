<script lang="ts">
	import type { PageData } from './$types';
	import PostItem from '$lib/components/layout/PostItem.svelte';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Institut ACSS-PSL : Blog</title>
</svelte:head>

<Breadcrumb title="Blog" title_path="blog" />

{#if data.posts.length > 0}
	<div class="blog-grid">
		{#each data.posts as post, index}
			<PostItem {post} {index} variant="card" priority={index < 3} />
		{/each}
	</div>
{:else}
	<p>No posts found</p>
{/if}

<style>
	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: clamp(1rem, 2.5vw, 2rem);
	}
</style>
