/**
 * Strapi CMS service for API interactions
 */

import { CMS_URL } from '$lib/constants';

/**
 * Build full Strapi URL for an image
 * @param path - Image path from Strapi
 * @returns Full URL
 */
export function buildImageUrl(path: string): string {
	if (!path) return '';
	return path.startsWith('http') ? path : `${CMS_URL}${path}`;
}

/**
 * Get image URL with optional format and size
 * @param image - Strapi image object
 * @param size - Size format (thumbnail, small, medium, large)
 * @returns Full image URL
 */
export function getImageUrl(
	image: any,
	size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): string | undefined {
	if (!image) return undefined;
	
	const url = image.formats?.[size]?.url || image.url;
	return url ? buildImageUrl(url) : undefined;
}

/**
 * Build srcset for responsive images
 * @param image - Strapi image object with formats
 * @returns Srcset string or undefined
 */
export function buildSrcSet(image: any): string | undefined {
	if (!image?.formats) return undefined;

	const formats = image.formats;
	const srcsetEntries: string[] = [];

	if (formats.thumbnail) {
		srcsetEntries.push(`${buildImageUrl(formats.thumbnail.url)} ${formats.thumbnail.width}w`);
	}
	if (formats.small) {
		srcsetEntries.push(`${buildImageUrl(formats.small.url)} ${formats.small.width}w`);
	}
	if (formats.medium) {
		srcsetEntries.push(`${buildImageUrl(formats.medium.url)} ${formats.medium.width}w`);
	}
	if (formats.large) {
		srcsetEntries.push(`${buildImageUrl(formats.large.url)} ${formats.large.width}w`);
	}

	return srcsetEntries.length > 0 ? srcsetEntries.join(', ') : undefined;
}

/**
 * Build WebP srcset by appending format parameter
 * @param srcset - Original srcset string
 * @returns WebP srcset or undefined
 */
export function buildWebPSrcSet(srcset: string | undefined): string | undefined {
	if (!srcset) return undefined;

	return srcset
		.split(', ')
		.map((entry) => {
			const [url, size] = entry.split(' ');
			return `${url}?format=webp ${size}`;
		})
		.join(', ');
}

/**
 * Extract dimensions from Strapi image
 * @param image - Strapi image object
 * @param size - Size format
 * @returns { width, height } or undefined
 */
export function getImageDimensions(
	image: any,
	size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): { width: number; height: number } | undefined {
	if (!image) return undefined;

	const format = image.formats?.[size];
	if (format?.width && format?.height) {
		return { width: format.width, height: format.height };
	}

	if (image.width && image.height) {
		return { width: image.width, height: image.height };
	}

	return undefined;
}

