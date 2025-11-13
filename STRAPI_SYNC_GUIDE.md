# Keeping Static Site in Sync with Strapi CMS

This guide explains how to keep your statically-generated SvelteKit site updated when Strapi content changes.

## Current Setup

- **Adapter**: `@sveltejs/adapter-vercel`
- **Rendering**: Static Site Generation (SSG) with full prerendering
- **CMS**: Strapi API calls in `+page.server.ts` files
- **Problem**: Data is fetched once at build time and becomes stale

## Solutions (Ranked Best to Good)

### ✅ Solution 1: ISR (Incremental Static Regeneration) - **RECOMMENDED**

**Best for**: Vercel deployments with moderate to high traffic

Vercel's ISR allows pages to be regenerated on-demand after a specified time period. This provides a perfect balance between performance and freshness.

#### How It Works

1. Page is prerendered at build time
2. First visitor after revalidation period triggers a background regeneration
3. Stale content is served while new content is fetched
4. Once new content is ready, subsequent visitors get the fresh content

#### Implementation

Add to any `+page.server.ts` file that fetches Strapi data:

```typescript
// src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import { posts } from '$lib/api';

// Revalidate every 60 seconds
export const config = {
  isr: {
    expiration: 60, // seconds
    // Optional: Allow stale content while revalidating
    allowQuery: ['id', 'slug'] // If you want query params to trigger revalidation
  }
};

export const load = (async () => {
  try {
    const allPosts = await posts.getAll();
    return { posts: allPosts };
  } catch (error) {
    console.error('Error loading posts:', error);
    return { posts: [] };
  }
}) satisfies PageServerLoad;
```

**Recommended Expiration Times:**
- **Homepage**: 60 seconds (high visibility)
- **Blog/News**: 300 seconds (5 minutes)
- **Static pages**: 3600 seconds (1 hour)
- **Dynamic content**: 30-60 seconds

**Pros:**
✅ No manual intervention needed
✅ Automatic updates
✅ Still serves cached content (fast)
✅ No rebuild costs
✅ Built into Vercel

**Cons:**
❌ Slight delay before all users see updates
❌ Only works on Vercel (or platforms with ISR support)

---

### ✅ Solution 2: Strapi Webhook + Vercel Deploy Hook

**Best for**: When you need immediate updates after content changes

#### How It Works

1. Content is updated in Strapi
2. Strapi sends webhook to Vercel
3. Vercel triggers a new deployment
4. Site is rebuilt with fresh data

#### Implementation

**Step 1: Create Vercel Deploy Hook**

1. Go to your Vercel project → Settings → Git
2. Scroll to "Deploy Hooks"
3. Create a new hook (e.g., "Strapi Content Update")
4. Copy the webhook URL

**Step 2: Configure Strapi Webhook**

1. In Strapi admin panel, go to Settings → Webhooks
2. Create a new webhook:
   - **Name**: Deploy Vercel Site
   - **URL**: [Your Vercel deploy hook URL]
   - **Events**: Select content type events (e.g., `entry.create`, `entry.update`, `entry.delete`)
   - **Content Types**: Select which content types should trigger rebuilds

**Example Strapi Webhook Configuration:**

```json
{
  "name": "Deploy Vercel Site",
  "url": "https://api.vercel.com/v1/integrations/deploy/[YOUR-HOOK-ID]",
  "headers": {},
  "events": [
    "entry.create",
    "entry.update",
    "entry.delete",
    "entry.publish",
    "entry.unpublish"
  ]
}
```

**Pros:**
✅ Immediate updates
✅ Full control over when to rebuild
✅ Works with any deployment platform
✅ Can filter by content type

**Cons:**
❌ Full site rebuild on every change (can be expensive)
❌ Build time delay (1-3 minutes typically)
❌ May hit build limits on free plans

**Optimization Tip:** Create multiple webhooks for different content types and only rebuild when important content changes.

---

### ✅ Solution 3: On-Demand Revalidation via API

**Best for**: Fine-grained control over specific page updates

#### How It Works

1. Content is updated in Strapi
2. Strapi calls your custom API endpoint
3. Your API invalidates specific pages
4. Only affected pages are regenerated

#### Implementation

**Step 1: Create Revalidation API Endpoint**

```typescript
// src/routes/api/revalidate/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Secret token to secure the endpoint
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || 'your-secret-token';

export const POST: RequestHandler = async ({ request, fetch }) => {
  try {
    // Verify the request is authenticated
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${REVALIDATE_TOKEN}`) {
      throw error(401, 'Unauthorized');
    }

    // Get the paths to revalidate from the request body
    const { paths } = await request.json();

    if (!paths || !Array.isArray(paths)) {
      throw error(400, 'Invalid request: paths array required');
    }

    // Revalidate each path
    const revalidationResults = await Promise.allSettled(
      paths.map(async (path: string) => {
        // Trigger a fetch to the path to regenerate it
        const response = await fetch(path, {
          headers: {
            'x-prerender-revalidate': REVALIDATE_TOKEN
          }
        });
        return { path, status: response.status };
      })
    );

    return json({
      revalidated: true,
      results: revalidationResults
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    throw error(500, 'Revalidation failed');
  }
};
```

**Step 2: Configure Strapi Webhook**

```json
{
  "name": "Revalidate Specific Pages",
  "url": "https://your-site.vercel.app/api/revalidate",
  "headers": {
    "Authorization": "Bearer your-secret-token"
  },
  "events": ["entry.update", "entry.publish"]
}
```

**Step 3: Strapi Custom Controller (optional)**

Create a custom Strapi controller to determine which paths to revalidate:

```javascript
// In Strapi: src/api/post/controllers/post.js
module.exports = {
  async afterUpdate(ctx) {
    const { id } = ctx.params;
    const { slug } = ctx.request.body.data;

    // Revalidate specific paths
    await fetch('https://your-site.vercel.app/api/revalidate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REVALIDATE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paths: [
          '/en/blog',
          '/fr/blog',
          `/en/blog/${slug}`,
          `/fr/blog/${slug}`
        ]
      })
    });

    return ctx;
  }
};
```

**Pros:**
✅ Only regenerates affected pages
✅ Fast updates (no full rebuild)
✅ Cost-effective
✅ Fine-grained control

**Cons:**
❌ Requires custom code in both systems
❌ More complex setup
❌ Need to maintain path logic

---

### ✅ Solution 4: Hybrid SSG + CSR (Client-Side Rendering)

**Best for**: Frequently changing content that doesn't need SEO

#### How It Works

1. Static pages are prerendered with placeholder content
2. Client fetches fresh data from Strapi on page load
3. Page updates in real-time

#### Implementation

```typescript
// src/routes/blog/+page.ts (NOTE: .ts not .server.ts)
import { browser } from '$app/environment';
import { posts } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
  // Only fetch on client side
  if (browser) {
    try {
      const allPosts = await posts.getAll();
      return { posts: allPosts };
    } catch (error) {
      console.error('Error loading posts:', error);
      return { posts: [] };
    }
  }

  // Return empty data for SSR/prerendering
  return { posts: [] };
}) satisfies PageLoad;
```

**Or use `+page.svelte` with `onMount`:**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { posts } from '$lib/api';

  let blogPosts = $state<Post[]>([]);
  let loading = $state(true);

  onMount(async () => {
    try {
      blogPosts = await posts.getAll();
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  {#each blogPosts as post}
    <!-- render post -->
  {/each}
{/if}
```

**Pros:**
✅ Always fresh data
✅ Real-time updates
✅ No rebuild needed
✅ Simple implementation

**Cons:**
❌ No SEO for dynamic content
❌ Slower initial render
❌ Requires client JavaScript
❌ More API calls = higher costs

**Use Cases:**
- User-specific dashboards
- Real-time comments
- Live event updates
- Non-SEO critical lists

---

## 🎯 Recommended Strategy: Combined Approach

For the best performance and UX, combine multiple strategies:

### Strategy A: ISR for Most Pages

```typescript
// src/routes/+page.server.ts (Homepage)
export const config = {
  isr: {
    expiration: 60 // Fresh every minute
  }
};

// src/routes/blog/+page.server.ts (Blog index)
export const config = {
  isr: {
    expiration: 300 // Fresh every 5 minutes
  }
};

// src/routes/blog/[slug]/+page.server.ts (Individual posts)
export const config = {
  isr: {
    expiration: 3600 // Fresh every hour
  }
};
```

### Strategy B: Webhook for Critical Updates

- Set up a Strapi webhook for "Featured" or "Breaking News" content types
- These trigger full rebuilds for immediate visibility

### Strategy C: CSR for Real-Time Features

- Use client-side fetching for:
  - Comments sections
  - Live event counters
  - User notifications

## Environment Variables

Add to your `.env` file:

```bash
# For on-demand revalidation
REVALIDATE_TOKEN=your-secret-revalidation-token-here

# Strapi CMS URL (already configured)
CMS_URL=https://cms.acss-psl.eu
```

## Testing ISR

After implementing ISR:

1. **Deploy to Vercel**
2. **Check page response headers:**
   ```bash
   curl -I https://your-site.vercel.app/blog
   ```
   Look for: `x-vercel-cache: STALE` or `x-vercel-cache: HIT`

3. **Verify revalidation:**
   - Update content in Strapi
   - Wait for expiration time
   - Refresh page and check if content updates

## Performance Comparison

| Solution | Update Speed | Cost | Complexity | SEO |
|----------|-------------|------|------------|-----|
| ISR | Minutes | Low | Low | ✅ Full |
| Webhook + Rebuild | 1-3 min | Medium | Low | ✅ Full |
| On-Demand Revalidation | Seconds | Low | High | ✅ Full |
| CSR | Instant | Medium | Low | ❌ None |

## Conclusion

**For your use case, I recommend:**

1. **Start with ISR** (Solution 1) - Easy to implement, works great on Vercel
2. **Add Webhook** (Solution 2) for critical content types that need immediate updates
3. **Use CSR** (Solution 4) only for truly real-time, non-SEO content

This gives you the best balance of performance, cost, and freshness.

## Next Steps

1. Add ISR config to all `+page.server.ts` files that fetch Strapi data
2. Set up a Strapi webhook for critical content updates
3. Monitor your Vercel analytics to see cache hit rates
4. Adjust expiration times based on content update frequency

## Resources

- [Vercel ISR Documentation](https://vercel.com/docs/incremental-static-regeneration)
- [SvelteKit Adapter Vercel](https://kit.svelte.dev/docs/adapter-vercel)
- [Strapi Webhooks Guide](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/webhooks.html)

