/**
 * Shared TypeScript types for the application
 */

/**
 * Strapi image format
 */
export interface StrapiImageFormat {
	url: string;
	width: number;
	height: number;
	mime?: string;
	size?: number;
}

/**
 * Strapi image with multiple formats
 */
export interface StrapiImage {
	url: string;
	alternativeText?: string;
	width?: number;
	height?: number;
	formats?: {
		thumbnail?: StrapiImageFormat;
		small?: StrapiImageFormat;
		medium?: StrapiImageFormat;
		large?: StrapiImageFormat;
	};
}

/**
 * Author from Strapi
 */
export interface Author {
	id: number;
	name: string;
	email?: string;
	bio?: string;
	avatar?: StrapiImage;
}

/**
 * Blog post from Strapi
 */
export interface BlogPost {
	id: number;
	Title: string;
	Slug: string;
	Content: string;
	publishedAt: string;
	updatedAt: string;
	Image?: StrapiImage;
	authors?: Author[];
}

/**
 * Seminar data
 */
export interface Seminar {
	id: number;
	documentId?: string;
	slug: string;
	date: string;
	time: string;
	type: string;
	presenter: string;
	title: string;
	abstract?: string;
	homepage?: string;
	location?: string;
}

/**
 * Team member
 */
export interface TeamMember {
	FirstName: string;
	LastName: string;
	Slug: string;
	ImageFileName: string;
	fonction: string;
	bio?: string;
	email?: string;
}

/**
 * Institute member
 */
export interface InstituteMember {
	first_name: string;
	last_name: string;
	slug: string;
	photo: string;
	affiliations: string[];
	disciplines: string[];
	bio?: string;
	email?: string;
	website?: string;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
	name: string;
	url: string;
}

/**
 * Menu item
 */
export interface MenuItem {
	label: string;
	href: string;
	children?: MenuItem[];
}

