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
	}

	let { post, index, priority = false }: Props = $props();
	let formattedDate = $derived(formatDate(post.publishedAt));
	let imageLoading = $derived<ImageLoading>(priority ? 'eager' : 'lazy');
	let imageFetchPriority = $derived<'high' | 'low' | 'auto'>(index === 0 ? 'high' : 'auto');
</script>

<article class="post-item">
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
		border-radius: 0.75rem;
		border: 1px solid rgba(74, 108, 170, 0.08);
		transition: all 0.3s ease;
	}

	.post-item:hover {
		transform: translateX(4px);
		box-shadow: 0 4px 12px rgba(74, 108, 170, 0.1);
		border-color: rgba(74, 108, 170, 0.15);
	}

	.post-image-wrapper {
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		border-radius: 0.5rem;
		overflow: hidden;
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

	.post-title {
		font-family: 'Quicksand', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.4;
		margin-bottom: 0.25rem;
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
