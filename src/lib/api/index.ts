/**
 * API Module
 * 
 * Centralized API client for Strapi CMS interactions.
 * 
 * Usage:
 * ```typescript
 * import { posts, seminars, authors } from '$lib/api';
 * 
 * // In a +page.server.ts file:
 * export const load = async () => {
 *   const recentPosts = await posts.getRecent(5);
 *   const upcomingSeminars = await seminars.getUpcoming();
 *   return { posts: recentPosts, seminars: upcomingSeminars };
 * };
 * ```
 */

export { apiClient, StrapiClient, ApiError } from './client';
export { posts, seminars, authors, fetchCollection, fetchSingle } from './endpoints';
export type * from './types';

