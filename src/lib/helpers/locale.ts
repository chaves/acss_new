/**
 * Locale and internationalization helper functions
 */

import { getLocale } from '$lib/paraglide/runtime';
import { LOCALE_TO_ISO, LOCALE_TO_OG, DATE_FORMAT_OPTIONS, type Locale } from '$lib/constants';

/**
 * Convert current locale to ISO format (en-US, fr-FR)
 */
export function getISOLocale(): string {
	const locale = getLocale() as Locale;
	return LOCALE_TO_ISO[locale] || LOCALE_TO_ISO.fr;
}

/**
 * Convert current locale to Open Graph format (en_US, fr_FR)
 */
export function getOGLocale(): string {
	const locale = getLocale() as Locale;
	return LOCALE_TO_OG[locale] || LOCALE_TO_OG.fr;
}

/**
 * Check if current locale is English
 */
export function isEnglish(): boolean {
	return getLocale() === 'en';
}

/**
 * Check if current locale is French
 */
export function isFrench(): boolean {
	return getLocale() === 'fr';
}

/**
 * Format a date string to localized date
 * @param dateString - ISO date string
 * @param options - Optional Intl.DateTimeFormatOptions
 */
export function formatDate(
	dateString: string,
	options: Intl.DateTimeFormatOptions = DATE_FORMAT_OPTIONS
): string {
	return new Date(dateString).toLocaleDateString(getISOLocale(), options);
}

/**
 * Format a date string to localized datetime
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDateTime(
	dateString: string,
	options: Intl.DateTimeFormatOptions
): string {
	return new Date(dateString).toLocaleDateString(getISOLocale(), options);
}

