/**
 * Application-wide constants and configuration
 */

/** Base CMS URL for Strapi */
export const CMS_URL = 'https://cms.acss-psl.eu';

/** Production website URL */
export const BASE_URL = 'https://acss-dig.psl.eu';

/** Available locales */
export const LOCALES = {
	EN: 'en' as const,
	FR: 'fr' as const
} as const;

/** Locale to ISO string mapping */
export const LOCALE_TO_ISO = {
	[LOCALES.EN]: 'en-US',
	[LOCALES.FR]: 'fr-FR'
} as const;

/** Locale to Open Graph locale mapping */
export const LOCALE_TO_OG = {
	[LOCALES.EN]: 'en_US',
	[LOCALES.FR]: 'fr_FR'
} as const;

/** Date format options for localized dates */
export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

/** Full datetime format options */
export const DATETIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	timeZone: 'Europe/Paris',
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};

/** Image loading strategies */
export const IMAGE_LOADING = {
	LAZY: 'lazy',
	EAGER: 'eager'
} as const;

/** Common image sizes from Strapi */
export const IMAGE_SIZES = {
	THUMBNAIL: 'thumbnail',
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large'
} as const;

export type Locale = typeof LOCALES[keyof typeof LOCALES];
export type ImageSize = typeof IMAGE_SIZES[keyof typeof IMAGE_SIZES];
export type ImageLoading = typeof IMAGE_LOADING[keyof typeof IMAGE_LOADING];

