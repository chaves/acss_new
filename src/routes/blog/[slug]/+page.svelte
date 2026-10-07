<script lang="ts">
	import { localizeSiteLinks } from '#lib/utils.js';
	import type { PageData } from './$types';
	import Breadcrumb from '#lib/components/layout/Breadcrumb.svelte';
	import * as m from '#lib/paraglide/messages.js';
	import SEO from '#lib/seo/SEO.svelte';
	import StructuredData from '#lib/seo/StructuredData.svelte';
	import { generateArticleSchema, generateBreadcrumbSchema } from '#lib/seo/schema-utils.js';
	import { formatDate, getOGLocale } from '#lib/helpers/locale.js';
	import { generateDescription } from '#lib/helpers/ui.js';
	import { getImageUrl } from '#lib/services/strapi.js';
	import { marked } from 'marked';
	import PostAuthors from '#lib/components/layout/PostAuthors.svelte';
	import OptimizedImage from '#lib/components/OptimizedImage.svelte';

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
	let contentHtml = $derived(localizeSiteLinks(marked(post.Content) as string));
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
	schema={false}
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
				sizes="(max-width: 880px) 100vw, 840px"
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

	/* The image sets its own box: no fixed frame, so no letterboxing whatever its ratio. */
	.article-image {
		display: flex;
		justify-content: center;
		width: min(100%, 840px);
		margin: 0 auto clamp(1.75rem, 4vw, 3rem);
	}

	.article-image :global(.article-image-element) {
		display: block;
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: min(32rem, 70vh);
		border-radius: var(--radius-lg, 1.25rem);
		border: 1px solid rgba(74, 108, 170, 0.1);
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
		/* long bare URLs (DOIs, etc.) must wrap instead of overflowing on mobile */
		overflow-wrap: anywhere;
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
