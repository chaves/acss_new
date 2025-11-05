/**
 * Strapi API Client
 * 
 * Provides a centralized, type-safe interface for all Strapi CMS API calls.
 */

import { CMS_URL } from '$lib/constants';
import type {
	ApiClientConfig,
	ApiRequestOptions,
	StrapiQueryParams,
	StrapiErrorResponse
} from './types';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public details?: any
	) {
		super(message);
		this.name = 'ApiError';
	}
}

/**
 * Build query string from Strapi query parameters
 */
function buildQueryString(params: StrapiQueryParams): string {
	const searchParams = new URLSearchParams();

	// Handle filters
	if (params.filters) {
		Object.entries(params.filters).forEach(([key, value]) => {
			if (typeof value === 'object' && value !== null) {
				// Handle nested filters like { date: { $gte: '2024-01-01' } }
				Object.entries(value).forEach(([operator, operatorValue]) => {
					searchParams.append(`filters[${key}][${operator}]`, String(operatorValue));
				});
			} else {
				searchParams.append(`filters[${key}]`, String(value));
			}
		});
	}

	// Handle populate
	if (params.populate) {
		if (params.populate === '*') {
			searchParams.append('populate', '*');
		} else if (Array.isArray(params.populate)) {
			params.populate.forEach((field) => {
				searchParams.append('populate[]', field);
			});
		} else {
			searchParams.append('populate', params.populate);
		}
	}

	// Handle sort
	if (params.sort) {
		if (Array.isArray(params.sort)) {
			params.sort.forEach((field) => {
				searchParams.append('sort[]', field);
			});
		} else {
			searchParams.append('sort', params.sort);
		}
	}

	// Handle pagination
	if (params.pagination) {
		Object.entries(params.pagination).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(`pagination[${key}]`, String(value));
			}
		});
	}

	// Handle fields
	if (params.fields) {
		params.fields.forEach((field) => {
			searchParams.append('fields[]', field);
		});
	}

	// Handle publication state
	if (params.publicationState) {
		searchParams.append('publicationState', params.publicationState);
	}

	// Handle locale
	if (params.locale) {
		searchParams.append('locale', params.locale);
	}

	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : '';
}

/**
 * Main API client class
 */
export class StrapiClient {
	private config: Required<ApiClientConfig>;

	constructor(config?: Partial<ApiClientConfig>) {
		this.config = {
			baseUrl: config?.baseUrl || `${CMS_URL}/api`,
			timeout: config?.timeout || 10000,
			headers: config?.headers || {},
			retries: config?.retries || 0,
			cache: config?.cache || 'default'
		};
	}

	/**
	 * Make a request to the Strapi API
	 */
	private async request<T>(
		endpoint: string,
		options: ApiRequestOptions = {}
	): Promise<T> {
		const url = `${this.config.baseUrl}${endpoint}`;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

		try {
			const response = await fetch(url, {
				method: options.method || 'GET',
				headers: {
					'Content-Type': 'application/json',
					...this.config.headers,
					...options.headers
				},
				body: options.body ? JSON.stringify(options.body) : undefined,
				signal: options.signal || controller.signal,
				cache: options.cache || this.config.cache
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				// Try to parse error response
				let errorData: StrapiErrorResponse | null = null;
				try {
					errorData = await response.json();
				} catch {
					// If JSON parsing fails, use status text
				}

				throw new ApiError(
					errorData?.error?.message || `Request failed: ${response.statusText}`,
					response.status,
					errorData?.error?.details
				);
			}

			return await response.json();
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof ApiError) {
				throw error;
			}

			if ((error as Error).name === 'AbortError') {
				throw new ApiError('Request timeout', 408);
			}

			throw new ApiError(
				`Network error: ${(error as Error).message}`,
				0
			);
		}
	}

	/**
	 * GET request with query parameters
	 */
	async get<T>(
		endpoint: string,
		params?: StrapiQueryParams,
		options?: ApiRequestOptions
	): Promise<T> {
		const queryString = params ? buildQueryString(params) : '';
		return this.request<T>(`${endpoint}${queryString}`, {
			...options,
			method: 'GET'
		});
	}

	/**
	 * POST request
	 */
	async post<T>(
		endpoint: string,
		body: any,
		options?: ApiRequestOptions
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: 'POST',
			body
		});
	}

	/**
	 * PUT request
	 */
	async put<T>(
		endpoint: string,
		body: any,
		options?: ApiRequestOptions
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: 'PUT',
			body
		});
	}

	/**
	 * DELETE request
	 */
	async delete<T>(
		endpoint: string,
		options?: ApiRequestOptions
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: 'DELETE'
		});
	}
}

/**
 * Default API client instance
 */
export const apiClient = new StrapiClient();

