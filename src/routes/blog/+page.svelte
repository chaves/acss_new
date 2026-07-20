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
	<div class="catalogue-hero">
		<span class="catalogue-count" aria-hidden="true">
			{String(data.posts.length).padStart(2, '0')}
		</span>
		<div class="featured-publication">
			<PostItem post={data.posts[0]} index={0} variant="featured" priority={true} />
		</div>
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
	.catalogue-hero {
		position: relative;
		display: grid;
		grid-template-columns: clamp(5.5rem, 10vw, 8rem) minmax(0, 1fr);
		align-items: stretch;
		gap: clamp(1rem, 2.5vw, 2rem);
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
		padding: clamp(1rem, 2.5vw, 2rem);
		overflow: hidden;
		border-radius: var(--radius-lg, 1.25rem);
		background:
			radial-gradient(circle at 0 100%, rgba(182, 70, 124, 0.3), transparent 18rem),
			linear-gradient(135deg, #163873, var(--acss-blue-dark, #1d4796));
		box-shadow: 0 20px 55px rgba(29, 71, 150, 0.16);
	}

	.catalogue-count {
		align-self: center;
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: clamp(3.75rem, 8vw, 7rem);
		font-weight: 700;
		line-height: 0.8;
		letter-spacing: -0.08em;
		color: transparent;
		-webkit-text-stroke: 1px rgba(255, 255, 255, 0.45);
		user-select: none;
	}

	.featured-publication {
		min-width: 0;
	}

	.featured-publication :global(.post-item) {
		border: 0;
		box-shadow: 0 16px 36px rgba(8, 27, 63, 0.26);
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
		.catalogue-hero {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.catalogue-count {
			font-size: 3.5rem;
		}

		.publication-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
