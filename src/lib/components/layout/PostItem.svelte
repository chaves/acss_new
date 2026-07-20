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
		variant?: 'compact' | 'card' | 'featured';
	}

	let { post, index, priority = false, variant = 'compact' }: Props = $props();
	let formattedDate = $derived(formatDate(post.publishedAt));
	let imageLoading = $derived<ImageLoading>(priority ? 'eager' : 'lazy');
	let imageFetchPriority = $derived<'high' | 'low' | 'auto'>(index === 0 ? 'high' : 'auto');
</script>

<article
	class:card-variant={variant === 'card'}
	class:featured-variant={variant === 'featured'}
	class="post-item"
>
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
		padding: 0.95rem 0;
		background: transparent;
		border-bottom: 1px solid rgba(74, 108, 170, 0.11);
		transition:
			transform var(--transition-fast, 150ms ease),
			border-color var(--transition-fast, 150ms ease);
	}

	.post-item:hover {
		transform: translateX(3px);
		border-color: rgba(74, 108, 170, 0.28);
	}

	.post-item.card-variant,
	.post-item.featured-variant {
		align-items: stretch;
		flex-direction: column;
		gap: 0;
		padding: 0;
		overflow: hidden;
		background: white;
		border: 1px solid rgba(74, 108, 170, 0.11);
		border-radius: var(--radius-md, 0.875rem);
	}

	.post-item.card-variant:hover,
	.post-item.featured-variant:hover {
		transform: translateY(-3px);
		border-color: rgba(74, 108, 170, 0.28);
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
		aspect-ratio: 2 / 1;
		border-radius: 0;
	}

	.featured-variant .post-image-wrapper {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 8.5;
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

	.card-variant .post-content,
	.featured-variant .post-content {
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

	.featured-variant .post-title {
		max-width: 25ch;
		font-size: clamp(1.4rem, 2.4vw, 1.75rem);
		line-height: 1.2;
		letter-spacing: -0.02em;
		text-wrap: balance;
		margin-bottom: 1rem;
	}

	.card-variant .post-meta,
	.featured-variant .post-meta {
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

	@media (min-width: 800px) {
		.post-item.featured-variant {
			display: grid;
			grid-template-columns: minmax(0, 0.8fr) minmax(19rem, 1.2fr);
			height: clamp(18rem, 27vw, 20rem);
		}

		.featured-variant .post-image-wrapper {
			height: 100%;
			min-height: 0;
			aspect-ratio: auto;
		}

		:global(.featured-variant .post-image) {
			object-fit: contain;
			padding: clamp(0.75rem, 1.5vw, 1rem);
		}

		.featured-variant .post-content {
			justify-content: center;
			min-height: 0;
			padding: clamp(1.35rem, 2.2vw, 1.75rem);
		}

		.featured-variant .post-meta {
			margin-top: 0;
		}
	}
</style>
