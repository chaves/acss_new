/**
 * Utility functions for generating Schema.org structured data
 */

const BASE_URL = 'https://acss-dig.psl.eu';

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
		logo: `${BASE_URL}/favicon.png`,
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
		image: article.image ? `${BASE_URL}${article.image}` : `${BASE_URL}/favicon.png`,
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
				url: `${BASE_URL}/favicon.png`
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${BASE_URL}${article.url}`
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
	location: {
		name: string;
		address: string;
	};
	image?: string;
	url: string;
}) {
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
			name: event.location.name,
			address: {
				'@type': 'PostalAddress',
				streetAddress: event.location.address,
				addressCountry: 'FR'
			}
		},
		image: event.image ? `${BASE_URL}${event.image}` : `${BASE_URL}/favicon.png`,
		organizer: {
			'@type': 'Organization',
			name: 'Institut ACSS-PSL',
			url: BASE_URL
		},
		url: `${BASE_URL}${event.url}`
	};
}

/**
 * Generate Person schema
 */
export function generatePersonSchema(person: {
	name: string;
	jobTitle?: string;
	affiliation?: string;
	image?: string;
	url: string;
	email?: string;
}) {
	return {
		'@type': 'Person',
		name: person.name,
		jobTitle: person.jobTitle,
		affiliation: person.affiliation
			? {
					'@type': 'Organization',
					name: person.affiliation
				}
			: undefined,
		image: person.image ? `${BASE_URL}${person.image}` : undefined,
		url: `${BASE_URL}${person.url}`,
		email: person.email
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
			item: `${BASE_URL}${crumb.url}`
		}))
	};
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema() {
	return {
		'@type': 'WebSite',
		name: 'Institut ACSS-PSL',
		description: 'Applied Computational Social Sciences - Data-Intensive Governance',
		url: BASE_URL,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${BASE_URL}/search?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}
