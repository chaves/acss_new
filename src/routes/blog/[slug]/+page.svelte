<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/layout/Breadcrumb.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import SEO from '$lib/seo/SEO.svelte';
	import StructuredData from '$lib/seo/StructuredData.svelte';
	import { generateArticleSchema, generateBreadcrumbSchema } from '$lib/seo/schema-utils';
	import { formatDate, getOGLocale } from '$lib/helpers/locale';
	import { generateDescription } from '$lib/helpers/ui';
	import { getImageUrl } from '$lib/services/strapi';
	import { marked } from 'marked';
	import PostAuthors from '$lib/components/layout/PostAuthors.svelte';
	import OptimizedImage from '$lib/components/OptimizedImage.svelte';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post[0]);

	// Compute static values
	const description = $derived(generateDescription(post.Content));
	const imageUrl = $derived(post.Image ? getImageUrl(post.Image, 'medium') : undefined);

	// Create schemas
	const articleSchema = $derived(
		generateArticleSchema({
			title: post.Title,
			description,
			publishedAt: post.publishedAt,
			modifiedAt: post.updatedAt,
			image: imageUrl,
			authors: post.authors,
			url: `/blog/${post.Slug}`
		})
	);

	const breadcrumbSchema = $derived(
		generateBreadcrumbSchema([
			{ name: 'Home', url: '/' },
			{ name: 'Blog', url: '/blog' },
			{ name: post.Title, url: `/blog/${post.Slug}` }
		])
	);

	// Derived reactive values
	let contentHtml = $derived(marked(post.Content));
	let localizedPublishedAt = $derived(formatDate(post.publishedAt));
	let ogLocale = $derived(getOGLocale());
</script>

<SEO
	title={`${post.Title} - Institut ACSS-PSL`}
	{description}
	type="article"
	url={`/blog/${post.Slug}`}
	image={imageUrl}
	author={post.authors?.[0]?.name || 'Institut ACSS-PSL'}
	publishedTime={post.publishedAt}
	modifiedTime={post.updatedAt}
	locale={ogLocale}
/>

<StructuredData data={articleSchema} />
<StructuredData data={breadcrumbSchema} />

<Breadcrumb
	title={post.Title}
	title_path={post.Title}
	link="blog"
	link_text="blog"
	publishedAt={localizedPublishedAt}
/>
<article class="article-shell">
	{#if post.Image}
		<div class="article-image">
			<OptimizedImage
				image={post.Image}
				alt={post.Title}
				size="large"
				class="article-image-element"
				loading="eager"
				fetchpriority="high"
			/>
		</div>
	{/if}
	<div class="blogPost article-content">
		<div class="prose max-w-none text-justify">{@html contentHtml}</div>
		<p class="article-meta">
			{m.published_at()}
			{localizedPublishedAt}
			<PostAuthors authors={post.authors} />
		</p>
	</div>
</article>

<style>
	.article-shell {
		max-width: 960px;
		margin-inline: auto;
	}

	.article-image {
		aspect-ratio: 16 / 9;
		margin-bottom: clamp(2rem, 5vw, 4rem);
		overflow: hidden;
		border-radius: var(--radius-lg, 1.25rem);
		background: var(--bg-secondary, #f8fafc);
	}

	.article-image :global(.article-image-element) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.article-content {
		max-width: var(--reading-max, 72ch);
		margin-inline: auto;
	}

	.article-content :global(.prose) {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-body, #475569);
	}

	.article-content :global(.prose h2),
	.article-content :global(.prose h3) {
		font-family: var(--font-heading, 'Quicksand', sans-serif);
		color: var(--color-heading, #1e293b);
	}

	.article-content :global(.prose a) {
		color: var(--acss-blue-dark, #1d4796);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
	}

	.article-meta {
		margin-top: 3rem;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(74, 108, 170, 0.14);
		color: var(--color-muted, #94a3b8);
		font-size: 0.875rem;
		font-style: italic;
		text-align: right;
	}
</style>
