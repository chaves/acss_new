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
	<div class="featured-publication">
		<PostItem post={data.posts[0]} index={0} variant="featured" priority={true} />
	</div>

	{#if data.posts.length > 1}
		<div class="publication-grid">
			{#each data.posts.slice(1) as post, index}
				<PostItem {post} index={index + 1} variant="card" priority={index < 2} />
			{/each}
		</div>
	{/if}
{:else}
	<p>No posts found</p>
{/if}

<style>
	.featured-publication {
		min-width: 0;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
	}

	.featured-publication :global(.post-item) {
		box-shadow: 0 14px 36px rgba(29, 71, 150, 0.11);
	}

	.publication-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1rem, 2.5vw, 2rem);
	}

	@media (max-width: 900px) {
		.publication-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 600px) {
		.publication-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
