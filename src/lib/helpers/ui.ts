/**
 * UI helper functions
 */

/**
 * Get alternating CSS class for even/odd items in lists
 * @param index - Item index (0-based)
 * @returns 'even' or 'odd' class name
 */
export function getAlternatingClass(index: number): 'even' | 'odd' {
	return index % 2 === 0 ? 'even' : 'odd';
}

/**
 * Truncate text to a specified length and add ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + '...';
}

/**
 * Remove markdown syntax from text
 * @param text - Text with markdown
 * @returns Plain text
 */
export function stripMarkdown(text: string): string {
	return text.replace(/[#*\[\]`_~]/g, '').trim();
}

/**
 * Generate a description from content (strips markdown and truncates)
 * @param content - Full content text
 * @param maxLength - Maximum description length (default 160)
 * @returns Clean description
 */
export function generateDescription(content: string, maxLength: number = 160): string {
	return truncate(stripMarkdown(content), maxLength);
}

