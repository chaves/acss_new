/**
 * Strapi API Endpoints
 *
 * Type-safe wrapper functions for specific API endpoints.
 */

import { apiClient } from './client';
import type { StrapiCollectionResponse, StrapiResponse, StrapiQueryParams } from './types';
import type { BlogPost, Seminar, TeamMember } from '$lib/types';

/**
 * Posts API
 */
export const posts = {
	/**
	 * Get all posts with optional filtering and pagination
	 */
	async getAll(params?: StrapiQueryParams): Promise<BlogPost[]> {
		const response = await apiClient.get<StrapiCollectionResponse<BlogPost>>('/posts', {
			populate: '*',
			sort: 'publishedAt:desc',
			pagination: { pageSize: 10 },
			...params
		});
		return response.data;
	},

	/**
	 * Get a single post by slug
	 */
	async getBySlug(slug: string): Promise<BlogPost | null> {
		const response = await apiClient.get<StrapiCollectionResponse<BlogPost>>('/posts', {
			filters: { Slug: slug },
			populate: '*'
		});
		return response.data[0] || null;
	},

	/**
	 * Get a single post by ID
	 */
	async getById(id: number): Promise<BlogPost> {
		const response = await apiClient.get<StrapiResponse<BlogPost>>(`/posts/${id}`, {
			populate: '*'
		});
		return response.data;
	},

	/**
	 * Get recent posts
	 */
	async getRecent(limit: number = 5): Promise<BlogPost[]> {
		return posts.getAll({
			pagination: { pageSize: limit },
			sort: 'publishedAt:desc'
		});
	}
};

/**
 * Seminars API
 */
export const seminars = {
	/**
	 * Get all seminars with optional filtering
	 */
	async getAll(params?: StrapiQueryParams): Promise<Seminar[]> {
		const response = await apiClient.get<StrapiCollectionResponse<Seminar>>('/seminars', {
			sort: 'date:asc',
			...params
		});
		return response.data;
	},

	/**
	 * Get a single seminar by slug
	 */
	async getBySlug(slug: string): Promise<Seminar | null> {
		try {
			const response = await apiClient.get<StrapiCollectionResponse<Seminar>>('/seminars', {
				filters: { slug: { $eq: slug } },
				populate: '*'
			});
			return response.data[0] || null;
		} catch {
			return null;
		}
	},

	/**
	 * Get upcoming seminars (date >= today)
	 */
	async getUpcoming(limit?: number): Promise<Seminar[]> {
		const today = new Date().toISOString();
		return seminars.getAll({
			filters: {
				date: { $gte: today }
			},
			sort: 'date:asc',
			...(limit && { pagination: { pageSize: limit } })
		});
	},

	/**
	 * Get seminars by type
	 */
	async getByType(type: string): Promise<Seminar[]> {
		return seminars.getAll({
			filters: { type },
			sort: 'date:desc'
		});
	},

	/**
	 * Get past seminars (date < today)
	 */
	async getPast(limit?: number): Promise<Seminar[]> {
		const today = new Date().toISOString();
		return seminars.getAll({
			filters: {
				date: { $lt: today }
			},
			sort: 'date:desc',
			...(limit && { pagination: { pageSize: limit } })
		});
	}
};

/**
 * Authors/Team API
 */
export const authors = {
	/**
	 * Get all authors with optional filtering
	 */
	async getAll(params?: StrapiQueryParams): Promise<TeamMember[]> {
		const response = await apiClient.get<StrapiCollectionResponse<TeamMember>>('/authors', {
			sort: 'LastName',
			...params
		});
		return response.data;
	},

	/**
	 * Get team members (ACSS engineers)
	 */
	async getTeam(): Promise<TeamMember[]> {
		return authors.getAll({
			filters: { type: 'acss_engineer' },
			sort: 'LastName'
		});
	},

	/**
	 * Get a single author by slug
	 */
	async getBySlug(slug: string): Promise<TeamMember | null> {
		// Trim the slug for matching
		const normalizedSlug = slug.trim();

		const response = await apiClient.get<StrapiCollectionResponse<TeamMember>>('/authors', {
			filters: { Slug: normalizedSlug },
			populate: '*'
		});

		return response.data[0] || null;
	},

	/**
	 * Get a single author by ID
	 */
	async getById(id: number): Promise<TeamMember> {
		const response = await apiClient.get<StrapiResponse<TeamMember>>(`/authors/${id}`, {
			populate: '*'
		});
		return response.data;
	}
};

/**
 * Generic collection fetcher for custom endpoints
 */
export async function fetchCollection<T>(
	endpoint: string,
	params?: StrapiQueryParams
): Promise<T[]> {
	const response = await apiClient.get<StrapiCollectionResponse<T>>(endpoint, params);
	return response.data;
}

/**
 * Generic single item fetcher for custom endpoints
 */
export async function fetchSingle<T>(endpoint: string, params?: StrapiQueryParams): Promise<T> {
	const response = await apiClient.get<StrapiResponse<T>>(endpoint, params);
	return response.data;
}

/**
 * Mailing List Subscriptions API
 */
export interface MailingListSubscriptionData {
	firstName: string;
	lastName: string;
	institution: string;
	email: string;
}

export interface MailingListSubscriptionResponse {
	data: {
		id: number;
		attributes: MailingListSubscriptionData & {
			createdAt: string;
			updatedAt: string;
			publishedAt?: string;
		};
	};
}

export const mailingList = {
	/**
	 * Subscribe to the mailing list
	 */
	async subscribe(data: MailingListSubscriptionData): Promise<MailingListSubscriptionResponse> {
		return apiClient.post<MailingListSubscriptionResponse>('/mailing-list-subscriptions', {
			data
		});
	}
};
