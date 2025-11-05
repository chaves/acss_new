# API Client Layer Documentation

## Overview

A comprehensive, type-safe API client layer for interacting with the Strapi CMS. This layer provides:

- ✅ **Type Safety**: Full TypeScript support with proper types
- ✅ **Error Handling**: Centralized error handling with custom error class
- ✅ **Query Builder**: Fluent API for building complex Strapi queries
- ✅ **Reusability**: Eliminate code duplication across server files
- ✅ **Maintainability**: Single source of truth for API interactions
- ✅ **Performance**: Built-in timeout and retry support

---

## 📁 File Structure

```
src/lib/api/
├── index.ts          # Barrel export (main entry point)
├── types.ts          # TypeScript types for API responses
├── client.ts         # Core API client with fetch wrapper
└── endpoints.ts      # Endpoint-specific functions
```

---

## 🚀 Quick Start

### Basic Usage

```typescript
// In any +page.server.ts file
import { posts, seminars, authors } from '$lib/api';

export const load = async () => {
  const recentPosts = await posts.getRecent(5);
  const upcomingSeminars = await seminars.getUpcoming();
  const team = await authors.getTeam();

  return { posts: recentPosts, seminars: upcomingSeminars, team };
};
```

---

## 📚 API Reference

### Posts API

#### `posts.getAll(params?)`
Get all posts with optional filtering and pagination.

```typescript
const allPosts = await posts.getAll();

// With custom params
const filteredPosts = await posts.getAll({
  pagination: { pageSize: 20 },
  sort: 'publishedAt:desc',
  filters: { category: 'research' }
});
```

#### `posts.getBySlug(slug)`
Get a single post by its slug.

```typescript
const post = await posts.getBySlug('my-article');
if (!post) {
  throw error(404, 'Post not found');
}
```

#### `posts.getById(id)`
Get a single post by its ID.

```typescript
const post = await posts.getById(42);
```

#### `posts.getRecent(limit)`
Get the most recent posts.

```typescript
const recentPosts = await posts.getRecent(10);
```

---

### Seminars API

#### `seminars.getAll(params?)`
Get all seminars with optional filtering.

```typescript
const allSeminars = await seminars.getAll({
  sort: 'date:desc',
  filters: { location: 'Paris' }
});
```

#### `seminars.getUpcoming()`
Get all upcoming seminars (date >= today).

```typescript
const upcoming = await seminars.getUpcoming();
```

#### `seminars.getPast(limit?)`
Get past seminars with optional limit.

```typescript
const pastSeminars = await seminars.getPast(5);
```

#### `seminars.getByType(type)`
Get seminars filtered by type.

```typescript
const nlpSeminars = await seminars.getByType('nlp');
const pubSeminars = await seminars.getByType('pub');
```

---

### Authors API

#### `authors.getAll(params?)`
Get all authors with optional filtering.

```typescript
const allAuthors = await authors.getAll();
```

#### `authors.getTeam()`
Get ACSS engineers (team members).

```typescript
const team = await authors.getTeam();
```

#### `authors.getBySlug(slug)`
Get a single author by slug.

```typescript
const author = await authors.getBySlug('john-doe');
```

#### `authors.getById(id)`
Get a single author by ID.

```typescript
const author = await authors.getById(123);
```

---

## 🔧 Advanced Usage

### Custom Query Parameters

All API functions accept `StrapiQueryParams`:

```typescript
interface StrapiQueryParams {
  filters?: Record<string, any>;
  populate?: string | string[] | '*';
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  publicationState?: 'live' | 'preview';
  locale?: string;
}
```

#### Example: Complex Filters

```typescript
const posts = await posts.getAll({
  filters: {
    publishedAt: { $gte: '2024-01-01' },
    category: 'research',
    authors: { name: { $contains: 'Smith' } }
  },
  populate: ['authors', 'Image'],
  sort: ['publishedAt:desc', 'title:asc'],
  pagination: { page: 1, pageSize: 20 }
});
```

---

### Generic Endpoints

For custom or new endpoints:

```typescript
import { fetchCollection, fetchSingle } from '$lib/api';

// Fetch a collection
const items = await fetchCollection<MyType>('/my-endpoint', {
  filters: { active: true }
});

// Fetch a single item
const item = await fetchSingle<MyType>('/my-endpoint/123', {
  populate: '*'
});
```

---

### Error Handling

The API client provides comprehensive error handling:

```typescript
import { ApiError } from '$lib/api';

try {
  const post = await posts.getBySlug('my-article');
} catch (err) {
  if (err instanceof ApiError) {
    console.error('API Error:', err.message);
    console.error('Status:', err.status);
    console.error('Details:', err.details);

    if (err.status === 404) {
      // Handle not found
    } else if (err.status === 408) {
      // Handle timeout
    }
  }
}
```

---

### Concurrent Requests

Use `Promise.all()` for parallel requests:

```typescript
export const load = async () => {
  const [posts, seminars, team] = await Promise.all([
    posts.getRecent(10),
    seminars.getUpcoming(),
    authors.getTeam()
  ]);

  return { posts, seminars, team };
};
```

---

### Custom Client Configuration

Create a custom client instance:

```typescript
import { StrapiClient } from '$lib/api';

const customClient = new StrapiClient({
  baseUrl: 'https://custom-cms.example.com/api',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token123'
  },
  cache: 'no-cache'
});

// Use custom client
const data = await customClient.get('/custom-endpoint');
```

---

## 🎯 Real-World Examples

### Example 1: Homepage Data Loading

**Before:**
```typescript
// +page.server.ts (old)
export const load = async () => {
  const date = new Date().toISOString();
  const source = 'https://cms.acss-psl.eu/api/';

  const url_seminars = `${source}seminars?filters[date][$gte]=${date}&sort=date:asc`;
  const url_posts = `${source}posts?pagination[pageSize]=10&populate=*&sort=publishedAt:desc`;

  const [seminarRes, postsRes] = await Promise.all([
    fetch(url_seminars),
    fetch(url_posts)
  ]);

  if (!seminarRes.ok || !postsRes.ok) {
    throw new Error('Failed to fetch data');
  }

  const [seminarsJson, postsJson] = await Promise.all([
    seminarRes.json(),
    postsRes.json()
  ]);

  return {
    seminars: seminarsJson.data,
    posts: postsJson.data
  };
};
```

**After:**
```typescript
// +page.server.ts (new)
import { posts, seminars } from '$lib/api';

export const load = async () => {
  try {
    const [upcomingSeminars, recentPosts] = await Promise.all([
      seminars.getUpcoming(),
      posts.getRecent(10)
    ]);

    return {
      seminars: upcomingSeminars,
      posts: recentPosts
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return { seminars: [], posts: [] };
  }
};
```

**Benefits:**
- 📉 Code reduced from 30+ lines to 15 lines
- ✅ Type-safe responses
- ✅ Better error handling
- ✅ More readable and maintainable

---

### Example 2: Blog Post by Slug

**Before:**
```typescript
export const load = async ({ params }) => {
  const source = 'https://cms.acss-psl.eu/api/';
  const url = `${source}posts?filters[Slug]=${params.slug}&populate=*`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data = await res.json();
  return { post: data.data };
};
```

**After:**
```typescript
import { posts } from '$lib/api';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  try {
    const post = await posts.getBySlug(params.slug);

    if (!post) {
      throw error(404, `Post not found: ${params.slug}`);
    }

    return { post: [post] };
  } catch (err) {
    console.error('Error loading post:', err);
    if ((err as any).status === 404) throw err;
    return { post: [] };
  }
};
```

---

### Example 3: Seminar Filtering

**Before:**
```typescript
export const load = async () => {
  const date = new Date().toISOString();
  const source = 'https://cms.acss-psl.eu/api/seminars';
  const url_upcoming = `${source}?filters[type]=nlp&filters[date][$gte]=${date}&sort=date:asc`;
  const url_past = `${source}?filters[type]=nlp&filters[date][$lt]=${date}&sort=date:desc`;

  const [upcoming, past] = await Promise.all([
    (await fetch(url_upcoming)).json(),
    (await fetch(url_past)).json()
  ]);

  return {
    seminars_upcoming: upcoming.data,
    seminars_past: past.data
  };
};
```

**After:**
```typescript
import { seminars } from '$lib/api';

export const load = async () => {
  try {
    const today = new Date().toISOString();

    const [seminars_upcoming, seminars_past] = await Promise.all([
      seminars.getAll({
        filters: { type: 'nlp', date: { $gte: today } },
        sort: 'date:asc'
      }),
      seminars.getAll({
        filters: { type: 'nlp', date: { $lt: today } },
        sort: 'date:desc'
      })
    ]);

    return { seminars_upcoming, seminars_past };
  } catch (error) {
    console.error('Error loading NLP seminars:', error);
    return { seminars_upcoming: [], seminars_past: [] };
  }
};
```

---

## 🧪 Testing

The API client is designed to be easily testable:

```typescript
// Mock the API client
import { vi } from 'vitest';
import * as api from '$lib/api';

vi.mock('$lib/api', () => ({
  posts: {
    getAll: vi.fn(() => Promise.resolve([/* mock data */])),
    getBySlug: vi.fn(() => Promise.resolve(/* mock post */))
  }
}));

// Test your load function
test('load function returns posts', async () => {
  const result = await load();
  expect(result.posts).toBeDefined();
});
```

---

## ⚙️ Configuration

### Timeout

Default timeout is 10 seconds. Customize per client:

```typescript
const client = new StrapiClient({ timeout: 5000 });
```

### Caching

Configure fetch cache strategy:

```typescript
const client = new StrapiClient({
  cache: 'no-cache' // or 'default', 'force-cache', etc.
});
```

### Headers

Add custom headers (e.g., for authentication):

```typescript
const client = new StrapiClient({
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'X-Custom-Header': 'value'
  }
});
```

---

## 🔍 Type Definitions

### StrapiResponse

```typescript
interface StrapiResponse<T> {
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
```

### StrapiCollectionResponse

```typescript
interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: { ... };
  };
}
```

### ApiError

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: any
  );
}
```

---

## 📊 Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Lines of Code** | ~30 per endpoint | ~15 per endpoint |
| **Type Safety** | ❌ None | ✅ Full TypeScript |
| **Error Handling** | ⚠️ Manual | ✅ Centralized |
| **Code Duplication** | ❌ High | ✅ None |
| **Maintainability** | 😢 Hard | 😊 Easy |
| **Testability** | ⚠️ Difficult | ✅ Easy to mock |

---

## 🚀 Migration Guide

### Step 1: Import the API

```typescript
import { posts, seminars, authors } from '$lib/api';
```

### Step 2: Replace fetch calls

```typescript
// Old
const res = await fetch('https://cms.acss-psl.eu/api/posts');
const data = await res.json();

// New
const posts = await posts.getAll();
```

### Step 3: Update error handling

```typescript
// Old
if (!res.ok) throw new Error('Failed');

// New
try {
  const data = await posts.getAll();
} catch (err) {
  if (err instanceof ApiError) {
    // Handle API error
  }
}
```

### Step 4: Simplify complex queries

```typescript
// Old
const url = `${source}posts?filters[Slug]=${slug}&populate=*`;

// New
const post = await posts.getBySlug(slug);
```

---

## 🎓 Best Practices

1. **Always use try-catch blocks** for error handling
2. **Use concurrent requests** with `Promise.all()` when possible
3. **Return empty arrays** as fallback in error cases
4. **Log errors** for debugging in production
5. **Check for null** when using `getBySlug()` or similar methods
6. **Use proper SvelteKit error()** for 404s
7. **Keep query params type-safe** with `StrapiQueryParams`

---

## 📝 Adding New Endpoints

To add a new endpoint:

### 1. Add types (if needed)

```typescript
// src/lib/types/index.ts
export interface MyNewType {
  id: number;
  title: string;
  // ...
}
```

### 2. Add endpoint functions

```typescript
// src/lib/api/endpoints.ts
export const myNewEndpoint = {
  async getAll(params?: StrapiQueryParams): Promise<MyNewType[]> {
    const response = await apiClient.get<StrapiCollectionResponse<MyNewType>>(
      '/my-endpoint',
      params
    );
    return response.data;
  },

  async getById(id: number): Promise<MyNewType> {
    const response = await apiClient.get<StrapiResponse<MyNewType>>(
      `/my-endpoint/${id}`
    );
    return response.data;
  }
};
```

### 3. Export from index

```typescript
// src/lib/api/index.ts
export { myNewEndpoint } from './endpoints';
```

### 4. Use in your app

```typescript
import { myNewEndpoint } from '$lib/api';

const items = await myNewEndpoint.getAll();
```

---

## 🐛 Troubleshooting

### Issue: Timeout errors

**Solution**: Increase timeout or check network connection

```typescript
const client = new StrapiClient({ timeout: 30000 });
```

### Issue: Type errors

**Solution**: Ensure your types match Strapi response structure

```typescript
// Check Strapi response format
console.log(await fetch('https://cms.acss-psl.eu/api/posts').then(r => r.json()));
```

### Issue: CORS errors

**Solution**: Ensure Strapi CORS is configured correctly

```javascript
// Strapi config/middleware.js
module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['https://your-domain.com']
    }
  }
};
```

---

**Last Updated**: 2025-11-05
**Version**: 1.0.0
**Author**: AI Assistant
**Project**: ACSS-PSL Institute Website

