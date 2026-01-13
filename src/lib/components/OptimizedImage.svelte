<script lang="ts">
	/**
	 * Optimized Image Component for Strapi CMS
	 *
	 * Provides:
	 * - Responsive images with srcset
	 * - WebP support with fallback
	 * - Lazy loading
	 * - Proper dimensions to prevent layout shift
	 * - SEO-friendly alt text
	 */

	import { getImageUrl, buildSrcSet, buildWebPSrcSet, getImageDimensions } from '$lib/services/strapi';
	import type { StrapiImage } from '$lib/types';
	import type { ImageSize, ImageLoading } from '$lib/constants';

	interface Props {
		/** Strapi image object with formats */
		image?: StrapiImage;
		/** Alt text override (uses image.alternativeText if not provided) */
		alt?: string;
		/** CSS classes to apply */
		class?: string;
		/** Lazy load (default: lazy) */
		loading?: ImageLoading;
		/** Image size priority: determines which format to use as primary */
		size?: ImageSize;
		/** Enable WebP format (default: true) */
		webp?: boolean;
		/** Fetch priority hint (high, low, auto) */
		fetchpriority?: 'high' | 'low' | 'auto';
	}

	let {
		image,
		alt,
		class: className = '',
		loading = 'lazy',
		size = 'medium',
		webp = true,
		fetchpriority = 'auto'
	}: Props = $props();

	// Derived values using the Strapi service
	let fullUrl = $derived(image ? (getImageUrl(image, size) ?? '') : '');
	let dimensions = $derived(image ? getImageDimensions(image, size) : undefined);
	let srcset = $derived(image ? buildSrcSet(image) : undefined);
	let webpSrcset = $derived(webp && srcset ? buildWebPSrcSet(srcset) : undefined);
	let altText = $derived(alt || image?.alternativeText || 'Image');

	// Warn in development if no image provided
	if (!image || !image.url) {
		console.warn('OptimizedImage: No image provided or image has no URL');
	}
</script>

{#if fullUrl}
	<!-- Standard img element with srcset -->
	<img
		src={fullUrl}
		srcset={srcset}
		sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
		alt={altText}
		class={className}
		width={dimensions?.width}
		height={dimensions?.height}
		{loading}
		{fetchpriority}
		decoding="async"
	/>
{:else}
	<!-- Fallback for missing image -->
	<div
		class={className}
		style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 200px;"
	>
		<span style="color: #999;">Image not available</span>
	</div>
{/if}

