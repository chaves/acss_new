/**
 * API Types for Strapi responses
 */

/**
 * Standard Strapi response wrapper
 */
export interface StrapiResponse<T> {
	data: T;
	meta?: {
		pagination?: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

/**
 * Strapi collection response (array of items)
 */
export interface StrapiCollectionResponse<T> {
	data: T[];
	meta?: {
		pagination?: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

/**
 * Strapi error response
 */
export interface StrapiError {
	status: number;
	name: string;
	message: string;
	details?: Record<string, any>;
}

/**
 * Strapi error response wrapper
 */
export interface StrapiErrorResponse {
	data: null;
	error: StrapiError;
}

/**
 * Query parameters for Strapi API
 */
export interface StrapiQueryParams {
	/** Filters for querying data */
	filters?: Record<string, any>;
	/** Fields to populate (relations) */
	populate?: string | string[] | '*';
	/** Sort order */
	sort?: string | string[];
	/** Pagination */
	pagination?: {
		page?: number;
		pageSize?: number;
		start?: number;
		limit?: number;
	};
	/** Fields to return */
	fields?: string[];
	/** Publication state */
	publicationState?: 'live' | 'preview';
	/** Locale */
	locale?: string;
}

/**
 * API client configuration
 */
export interface ApiClientConfig {
	baseUrl: string;
	timeout?: number;
	headers?: Record<string, string>;
	retries?: number;
	cache?: RequestCache;
}

/**
 * API request options
 */
export interface ApiRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	headers?: Record<string, string>;
	body?: any;
	signal?: AbortSignal;
	cache?: RequestCache;
}

