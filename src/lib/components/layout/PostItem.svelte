<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import Link from '$lib/components/Link.svelte';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';
	import { formatDate } from '$lib/helpers/locale';
	import type { BlogPost } from '$lib/types';
	import type { ImageLoading } from '$lib/constants';

	interface Props {
		post: BlogPost;
		index: number;
		priority?: boolean;
		variant?: 'compact' | 'card';
	}

	let { post, index, priority = false, variant = 'compact' }: Props = $props();
	let formattedDate = $derived(formatDate(post.publishedAt));
	let imageLoading = $derived<ImageLoading>(priority ? 'eager' : 'lazy');
	let imageFetchPriority = $derived<'high' | 'low' | 'auto'>(index === 0 ? 'high' : 'auto');
</script>

<article class:card-variant={variant === 'card'} class="post-item">
	{#if post.Image}
		<div class="post-image-wrapper">
			<OptimizedImage
				image={post.Image}
				alt={post.Title}
				size="thumbnail"
				class="post-image"
				loading={imageLoading}
				fetchpriority={imageFetchPriority}
			/>
		</div>
	{/if}
	<div class="post-content">
		<h3 class="post-title">
			<Link href="/blog/{post.Slug}">{post.Title}</Link>
		</h3>
		<p class="post-meta">
			<span class="meta-label">{m.published_at()}</span>
			<span class="meta-date">{formattedDate}</span>
		</p>
	</div>
</article>

<style>
	.post-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: white;
		border-radius: var(--radius-md, 0.875rem);
		border: 1px solid rgba(74, 108, 170, 0.08);
		transition:
			transform var(--transition-fast, 150ms ease),
			border-color var(--transition-fast, 150ms ease);
	}

	.post-item:hover {
		transform: translateY(-2px);
		border-color: rgba(74, 108, 170, 0.15);
	}

	.post-item.card-variant {
		align-items: stretch;
		flex-direction: column;
		gap: 0;
		padding: 0;
		overflow: hidden;
	}

	.post-image-wrapper {
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.card-variant .post-image-wrapper {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 10;
		border-radius: 0;
	}

	:global(.post-item .post-image) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.post-content {
		flex: 1;
		min-width: 0;
	}

	.card-variant .post-content {
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
	}

	.post-title {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.4;
		margin-bottom: 0.25rem;
	}

	.card-variant .post-title {
		font-size: 1.125rem;
		line-height: 1.45;
		margin-bottom: 0.75rem;
	}

	.card-variant .post-meta {
		margin-top: auto;
	}

	.post-meta {
		font-size: 0.8125rem;
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.meta-label {
		color: var(--color-muted, #94a3b8);
	}

	.meta-date {
		color: var(--acss-blue, #4a6caa);
		font-weight: 500;
	}
</style>
