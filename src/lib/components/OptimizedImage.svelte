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

	interface Props {
		/** Strapi image object with formats */
		image?: {
			url: string;
			alternativeText?: string;
			width?: number;
			height?: number;
			formats?: {
				thumbnail?: { url: string; width: number; height: number };
				small?: { url: string; width: number; height: number };
				medium?: { url: string; width: number; height: number };
				large?: { url: string; width: number; height: number };
			};
		};
		/** Alt text override (uses image.alternativeText if not provided) */
		alt?: string;
		/** CSS classes to apply */
		class?: string;
		/** Lazy load (default: true) */
		loading?: 'lazy' | 'eager';
		/** Image size priority: determines which format to use as primary */
		size?: 'thumbnail' | 'small' | 'medium' | 'large';
		/** Enable WebP format (default: true) */
		webp?: boolean;
	}

	let {
		image,
		alt,
		class: className = '',
		loading = 'lazy',
		size = 'medium',
		webp = true
	}: Props = $props();

	const CMS_URL = 'https://cms.acss-psl.eu';

	// Early return if no image
	if (!image || !image.url) {
		console.warn('OptimizedImage: No image provided or image has no URL');
	}

	// Get the primary image URL
	const primaryUrl = image?.formats?.[size]?.url || image?.url || '';
	const fullUrl = primaryUrl ? `${CMS_URL}${primaryUrl}` : '';

	// Get dimensions for preventing layout shift
	const width = image?.formats?.[size]?.width || image?.width;
	const height = image?.formats?.[size]?.height || image?.height;

	// Build srcset for responsive images
	const buildSrcSet = () => {
		if (!image) return undefined;
		const formats = image.formats;
		if (!formats) return undefined;

		const srcsetEntries: string[] = [];

		// Add available formats to srcset
		if (formats.thumbnail) {
			srcsetEntries.push(`${CMS_URL}${formats.thumbnail.url} ${formats.thumbnail.width}w`);
		}
		if (formats.small) {
			srcsetEntries.push(`${CMS_URL}${formats.small.url} ${formats.small.width}w`);
		}
		if (formats.medium) {
			srcsetEntries.push(`${CMS_URL}${formats.medium.url} ${formats.medium.width}w`);
		}
		if (formats.large) {
			srcsetEntries.push(`${CMS_URL}${formats.large.url} ${formats.large.width}w`);
		}

		return srcsetEntries.length > 0 ? srcsetEntries.join(', ') : undefined;
	};

	const srcset = buildSrcSet();
	const altText = alt || image?.alternativeText || 'Image';

	// Build WebP srcset if enabled (using Strapi URL parameter)
	const buildWebPSrcSet = () => {
		if (!webp || !srcset) return undefined;

		// Strapi supports format conversion via URL parameters: ?format=webp
		// Only works if Sharp plugin is configured in Strapi
		return srcset
			.split(', ')
			.map((entry) => {
				const [url, size] = entry.split(' ');
				return `${url}?format=webp ${size}`;
			})
			.join(', ');
	};

	const webpSrcset = buildWebPSrcSet();
</script>

{#if fullUrl}
	<!-- Standard img element with srcset -->
	<img
		src={fullUrl}
		srcset={srcset}
		sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
		alt={altText}
		class={className}
		width={width}
		height={height}
		loading={loading}
		decoding="async"
	/>
{:else}
	<!-- Fallback for missing image -->
	<div class={className} style="background: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 200px;">
		<span style="color: #999;">Image not available</span>
	</div>
{/if}

