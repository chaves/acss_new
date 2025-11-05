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
	let post = data.post[0];

	// Compute static values
	const description = generateDescription(post.Content);
	const imageUrl = post.Image ? getImageUrl(post.Image, 'medium') : undefined;

	// Create schemas
	const articleSchema = generateArticleSchema({
		title: post.Title,
		description,
		publishedAt: post.publishedAt,
		modifiedAt: post.updatedAt,
		image: imageUrl,
		authors: post.authors,
		url: `/blog/${post.Slug}`
	});

	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: 'Home', url: '/' },
		{ name: 'Blog', url: '/blog' },
		{ name: post.Title, url: `/blog/${post.Slug}` }
	]);

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
<!-- Container flex layout to place post content on the left and image on the right -->
<div class="flex flex-col md:flex-row">
	<div class="blogPost flex-1">
		<div class="prose max-w-none text-justify">{@html contentHtml}</div>
		<p class="text-right italic text-gray-500">
			{m.published_at()}
			{localizedPublishedAt}
			<PostAuthors authors={post.authors} />
		</p>
	</div>
	{#if post.Image}
		<div class="flex items-start justify-center md:w-1/3 md:pl-4">
			<OptimizedImage
				image={post.Image}
				alt={post.Title}
				size="medium"
				class="w-72 rounded-lg object-cover"
			/>
		</div>
	{/if}
</div>
