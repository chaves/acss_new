/**
 * Utility functions for generating Schema.org structured data
 */

import { getLocale, locales } from '$lib/paraglide/runtime';

const BASE_URL = 'https://acss-dig.psl.eu';

/**
 * Absolute URL for a page, carrying the active locale prefix.
 *
 * Both `/membres/x` and `/fr/membres/x` resolve, but the canonical form is the
 * prefixed one, so schema URLs must match it — otherwise the same entity is
 * described under two different identifiers.
 */
export function pageUrl(path: string): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	const [, first] = clean.split('/');

	// Already prefixed by the caller — leave it alone.
	if (locales.includes(first as never)) {
		return `${BASE_URL}${clean}`.replace(/\/$/, '') || BASE_URL;
	}

	const prefixed = `${BASE_URL}/${getLocale()}${clean}`;
	return prefixed.replace(/\/$/, '');
}

/**
 * Absolute URL for a static asset. Assets are served without a locale prefix.
 */
function assetUrl(path: string): string {
	return path.startsWith('http') ? path : `${BASE_URL}${path}`;
}

/**
 * Qualify a session title with its seminar series, without repeating the series
 * name when the title already carries it.
 */
export function buildEventName(series: string, title: string): string {
	const normalise = (value: string) => value.toLowerCase().replace(/\s+/g, ' ').trim();
	return normalise(title).includes(normalise(series)) ? title : `${series}: ${title}`;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
	const socialLinks = [
		// 'https://twitter.com/AcssPsl',
		// Add more social media URLs here when available
	].filter(Boolean);

	return {
		'@type': 'Organization',
		name: 'Institut ACSS-PSL',
		alternateName: 'Applied Computational Social Sciences - Data-Intensive Governance',
		url: BASE_URL,
		logo: assetUrl('/images/logos/acss_logo.svg'),
		description:
			'Expertise in social sciences research coupled with data science capabilities for better governance',
		...(socialLinks.length > 0 && { sameAs: socialLinks }),
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Place du Maréchal de Lattre de Tassigny',
			addressLocality: 'Paris',
			postalCode: '75016',
			addressCountry: 'FR'
		}
	};
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(article: {
	title: string;
	description: string;
	publishedAt: string;
	modifiedAt?: string;
	image?: string;
	authors?: Array<{ name: string }>;
	url: string;
}) {
	return {
		'@type': 'Article',
		headline: article.title,
		description: article.description,
		image: assetUrl(article.image || '/images/logos/acss_logo.svg'),
		datePublished: article.publishedAt,
		dateModified: article.modifiedAt || article.publishedAt,
		author: article.authors?.map((author) => ({
			'@type': 'Person',
			name: author.name
		})) || [
			{
				'@type': 'Organization',
				name: 'Institut ACSS-PSL'
			}
		],
		publisher: {
			'@type': 'Organization',
			name: 'Institut ACSS-PSL',
			logo: {
				'@type': 'ImageObject',
				url: assetUrl('/images/logos/acss_logo.svg')
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': pageUrl(article.url)
		}
	};
}

/**
 * Generate Event schema
 */
export function generateEventSchema(event: {
	name: string;
	description: string;
	startDate: string;
	endDate?: string;
	location?: {
		name?: string;
		address?: string;
	};
	presenter?: string;
	image?: string;
	url: string;
}) {
	// Seminar location is free-text in the CMS and often missing; fall back to the institute.
	const placeName = event.location?.name || 'Institut ACSS-PSL, Université PSL';
	const streetAddress =
		event.location?.address || 'Place du Maréchal de Lattre de Tassigny, 75016 Paris';

	return {
		'@type': 'Event',
		name: event.name,
		description: event.description,
		startDate: event.startDate,
		endDate: event.endDate || event.startDate,
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		location: {
			'@type': 'Place',
			name: placeName,
			address: {
				'@type': 'PostalAddress',
				streetAddress,
				addressLocality: 'Paris',
				addressCountry: 'FR'
			}
		},
		...(event.presenter && {
			performer: {
				'@type': 'Person',
				name: event.presenter
			}
		}),
		image: assetUrl(event.image || '/images/logos/acss_logo.svg'),
		organizer: {
			'@type': 'Organization',
			name: 'Institut ACSS-PSL',
			url: BASE_URL
		},
		url: pageUrl(event.url)
	};
}

/**
 * Generate Person schema
 */
export function generatePersonSchema(person: {
	name: string;
	jobTitle?: string;
	affiliation?: string;
	/** Additional affiliations beyond the primary one. */
	affiliations?: string[];
	/** Areas of expertise — the Schema.org property for what a person works on. */
	knowsAbout?: string[];
	/** Authoritative profiles elsewhere, used to disambiguate the entity. */
	sameAs?: string[];
	image?: string;
	url: string;
	email?: string;
}) {
	const affiliationNames = [
		...(person.affiliation ? [person.affiliation] : []),
		...(person.affiliations ?? [])
	].filter((name, index, all) => name && all.indexOf(name) === index);

	const affiliation = affiliationNames.map((name) => ({
		'@type': 'Organization',
		name
	}));

	const sameAs = (person.sameAs ?? []).filter(Boolean);
	const knowsAbout = (person.knowsAbout ?? []).filter(Boolean);

	return {
		'@type': 'Person',
		name: person.name,
		...(person.jobTitle && { jobTitle: person.jobTitle }),
		...(affiliation.length && {
			affiliation: affiliation.length === 1 ? affiliation[0] : affiliation
		}),
		...(knowsAbout.length && { knowsAbout }),
		...(sameAs.length && { sameAs }),
		...(person.image && { image: assetUrl(person.image) }),
		url: pageUrl(person.url),
		...(person.email && { email: person.email }),
		memberOf: {
			'@type': 'Organization',
			name: 'Institut ACSS-PSL',
			url: BASE_URL
		}
	};
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: pageUrl(crumb.url)
		}))
	};
}

/**
 * Generate WebSite schema.
 *
 * No SearchAction: the site has no /search route, and declaring a search endpoint
 * that 404s makes the rest of the markup less trustworthy. Add one back only if a
 * real search page ships.
 */
export function generateWebSiteSchema() {
	return {
		'@type': 'WebSite',
		name: 'Institut ACSS-PSL',
		alternateName: 'Applied Computational Social Sciences - Data-Intensive Governance',
		description: 'Applied Computational Social Sciences - Data-Intensive Governance',
		url: BASE_URL,
		inLanguage: locales as unknown as string[],
		publisher: {
			'@type': 'Organization',
			name: 'Institut ACSS-PSL',
			url: BASE_URL
		}
	};
}
