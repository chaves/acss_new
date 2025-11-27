# Immediate Content Updates Setup Guide

This guide shows you how to configure **immediate content updates** from Strapi without waiting for ISR expiration times.

## 🎯 Problem

ISR (Incremental Static Regeneration) has expiration delays:
- Homepage: 60 seconds
- Blog: 5 minutes
- Seminars: 10 minutes
- Team: 30 minutes

**You need updates immediately** when Strapi content changes.

## ✅ Two Solutions Available

### Option 1: Vercel Deploy Hook (Simplest - Recommended) ⭐

**Best for**: Most use cases - immediate updates with minimal setup

✅ Simple 5-minute setup
✅ Guaranteed to work
✅ No code changes needed
❌ Full site rebuild (1-3 minutes)

👉 **Jump to:** [Vercel Deploy Hook Setup](#option-1-vercel-deploy-hook-recommended)

### Option 2: On-Demand Revalidation API (More Granular)

**Best for**: When you want to regenerate only specific pages (faster, but more complex)

✅ Only regenerates affected pages
✅ Faster updates (seconds vs minutes)
❌ More complex setup
❌ Requires custom endpoint

👉 **Jump to:** [On-Demand Revalidation API Setup](#option-2-on-demand-revalidation-api)

---

## Option 1: Vercel Deploy Hook (Recommended)

This is the **simplest and most reliable** solution. When Strapi content changes, it triggers a full site rebuild on Vercel, ensuring all content is fresh.

### Setup Steps

#### Step 1: Create Vercel Deploy Hook

1. Go to your **Vercel Dashboard** → Your Project
2. Navigate to **Settings** → **Git**
3. Scroll down to **Deploy Hooks**
4. Click **Create Hook**
5. Configure:
   - **Name**: `Strapi Content Update`
   - **Git Branch**: `main` (or your production branch)
   - **Build Command**: Leave default (or empty)
   - **Output Directory**: Leave default (or empty)
6. Click **Create Hook**
7. **Copy the webhook URL** (looks like: `https://api.vercel.com/v1/integrations/deploy/...`)

#### Step 2: Configure Strapi Webhook

1. **Login to Strapi Admin Panel**
2. Go to **Settings** → **Webhooks**
3. Click **Create new webhook**
4. Fill in the form:

   **Basic Information:**
   - **Name**: `Trigger Vercel Deployment`
   - **URL**: `[Paste your Vercel Deploy Hook URL from Step 1]`

   **Events:**
   Select which events should trigger a rebuild:
   - ✅ `entry.publish` - When content is published (most common)
   - ✅ `entry.update` - When content is updated
   - ✅ `entry.create` - When new content is created
   - ✅ `entry.delete` - When content is deleted
   - ✅ `entry.unpublish` - When content is unpublished

   **Content Types:**
   Select which content types should trigger rebuilds:
   - `post` (Blog posts)
   - `author` (Team members)
   - `seminar` (Seminars)
   - Or select **All content types** if you want everything to trigger

5. Click **Save**

#### Step 3: Test It!

1. Go to Strapi and **update a blog post** (or any selected content type)
2. **Publish** the changes
3. Check **Strapi webhook logs**:
   - Go to Settings → Webhooks → Click on your webhook
   - Check "Last trigger" - should show recent timestamp
   - Check response status (should be 200)
4. Check **Vercel dashboard**:
   - You should see a new deployment starting
   - Wait 1-3 minutes for build to complete
5. Visit your website - fresh content should be live! 🎉

### How It Works

```
1. Content updated in Strapi
2. Strapi webhook triggers → Calls Vercel Deploy Hook
3. Vercel starts new deployment
4. Build fetches fresh data from Strapi
5. Site deploys with updated content (1-3 minutes)
6. All pages now show fresh content ✨
```

### Pros & Cons

**Pros:**
- ✅ Extremely simple setup (5 minutes)
- ✅ Guaranteed fresh content
- ✅ No code changes needed
- ✅ Works with any content type
- ✅ Reliable and battle-tested

**Cons:**
- ❌ Full site rebuild (1-3 minutes)
- ❌ Uses build minutes (might matter on free plan)
- ❌ Slight delay before content is live

### Optimization Tips

1. **Only rebuild on important events:**
   - Select only `entry.publish` instead of all events
   - Only select important content types

2. **Create multiple hooks:**
   - One for critical content (blog posts) → triggers immediately
   - One for less critical content (team updates) → can wait for ISR

3. **Monitor build times:**
   - If builds take too long, optimize your build process
   - Consider using Option 2 for faster updates

---

## Option 2: On-Demand Revalidation API

This solution regenerates only specific pages without a full rebuild. It's faster but requires more setup.

### Setup Steps

#### Step 1: Generate a Secret Token

```bash
# Generate a secure random token
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Save this token - you'll need it for both Vercel and Strapi.

#### Step 2: Add Token to Vercel Environment Variables

1. Go to your **Vercel Dashboard** → Your Project
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `REVALIDATE_TOKEN`
   - **Value**: `[Your generated token from Step 1]`
   - **Environments**: Production, Preview (optional: Development)
4. Click **Save**
5. **Redeploy** your site (or wait for next deployment)

#### Step 3: Configure Strapi Webhook

1. **Login to Strapi Admin Panel**
2. Go to **Settings** → **Webhooks**
3. Click **Create new webhook**
4. Fill in the form:

   **Basic Information:**
   - **Name**: `Revalidate Website Pages`
   - **URL**: `https://acss-dig.psl.eu/api/revalidate`

   **Events:**
   Select which events should trigger revalidation:
   - ✅ `entry.publish` - When content is published
   - ✅ `entry.update` - When content is updated
   - ✅ `entry.delete` - When content is deleted

   **Headers:**
   Click "Add header" and add:
   - **Key**: `Authorization`
   - **Value**: `Bearer [Your token from Step 1]`
   - **Content-Type**: `application/json`

   **Content Types:**
   Select which content types should trigger revalidation:
   - `post` (Blog posts)
   - `author` (Team members)
   - `seminar` (Seminars)

5. Click **Save**

#### Step 4: Test the Setup

**Test 1: Manual API Call**

```bash
curl -X POST https://acss-dig.psl.eu/api/revalidate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paths": ["/en/blog", "/fr/blog"]
  }'
```

Expected response:
```json
{
  "success": true,
  "revalidated": ["/en/blog", "/fr/blog"],
  "total": 2,
  "successful": 2
}
```

**Test 2: Auto-Detect Paths**

The endpoint can automatically determine which paths to revalidate based on content type:

```bash
curl -X POST https://acss-dig.psl.eu/api/revalidate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "api::post.post",
    "entry": {
      "slug": "my-new-post"
    }
  }'
```

This automatically revalidates:
- `/en/blog` and `/fr/blog` (index pages)
- `/en/blog/my-new-post` and `/fr/blog/my-new-post` (individual post)
- `/en/` and `/fr/` (homepages)

**Test 3: Update Content in Strapi**

1. Create or update a blog post in Strapi
2. Publish it
3. Check Strapi webhook logs
4. Wait 10-30 seconds
5. Visit your website - the new content should appear immediately! 🎉

### How It Works

```
1. Content updated in Strapi
2. Strapi webhook → Calls /api/revalidate endpoint
3. Endpoint determines which pages to regenerate
4. Pages are regenerated with fresh Strapi data (10-30 seconds)
5. Only affected pages are updated (not full rebuild)
```

### Automatic Path Detection

The endpoint automatically determines which pages to revalidate:

| Content Type | Revalidated Paths |
|-------------|------------------|
| `post` | Blog index pages, individual post pages, homepages |
| `author` | Team index pages, individual team member pages, homepages |
| `seminar` | All seminar pages (NLP, Public Governance), homepages |

### Custom Webhook Payload

By default, Strapi sends event data. You can customize the payload:

**Option 1: Auto-detect (Recommended)**
```json
{
  "model": "api::post.post",
  "entry": {
    "slug": "my-post-slug"
  }
}
```

**Option 2: Explicit paths**
```json
{
  "paths": [
    "/en/blog",
    "/fr/blog",
    "/en/blog/my-post",
    "/fr/blog/my-post"
  ]
}
```

### Pros & Cons

**Pros:**
- ✅ Only regenerates affected pages (faster)
- ✅ Updates in 10-30 seconds (vs 1-3 minutes)
- ✅ Doesn't use build minutes
- ✅ Granular control

**Cons:**
- ❌ More complex setup
- ❌ Requires custom endpoint code
- ❌ May miss related pages if not configured correctly

---

## 🐛 Troubleshooting

### Webhook Not Triggering

1. **Check Strapi Webhook Settings:**
   - Verify events are selected
   - Verify content types are selected
   - Check webhook is enabled

2. **Check Strapi Webhook Logs:**
   - Go to Settings → Webhooks → Click on your webhook
   - Check "Last trigger" to see if it's being called
   - Check response status codes

3. **Test Manually:**
   - For Deploy Hook: Click "Send Test" in Vercel dashboard
   - For Revalidation API: Use curl command from Step 4

### Content Still Not Updating

1. **Wait for completion:**
   - Deploy Hook: 1-3 minutes for full rebuild
   - Revalidation API: 10-30 seconds for page regeneration

2. **Clear browser cache:**
   - Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

3. **Check deployment logs:**
   - Vercel Dashboard → Deployments → Click latest deployment → Logs

### 401 Unauthorized Error (Revalidation API only)

- Verify `REVALIDATE_TOKEN` is set in Vercel environment variables
- Verify the token in Strapi webhook headers matches exactly
- Make sure there are no extra spaces in the token
- Redeploy your Vercel site after adding the environment variable

---

## 📊 Comparison

| Feature | Deploy Hook | Revalidation API |
|---------|-------------|------------------|
| **Setup Time** | 5 minutes | 15 minutes |
| **Update Speed** | 1-3 minutes | 10-30 seconds |
| **Rebuild Scope** | Full site | Selected pages |
| **Build Minutes** | Uses build time | Minimal |
| **Reliability** | Very high | High |
| **Complexity** | Low | Medium |

## 🎯 Recommendation

- **Start with Deploy Hook** (Option 1) - It's simpler and works reliably
- **Upgrade to Revalidation API** (Option 2) if you need faster updates or have build minute limits

---

## ✅ Quick Checklist

### For Deploy Hook:
- [ ] Created Vercel Deploy Hook
- [ ] Copied webhook URL
- [ ] Created Strapi webhook
- [ ] Selected appropriate events and content types
- [ ] Tested by updating content in Strapi
- [ ] Verified new deployment in Vercel dashboard
- [ ] Confirmed fresh content on website

### For Revalidation API:
- [ ] Generated secure token
- [ ] Added `REVALIDATE_TOKEN` to Vercel environment variables
- [ ] Redeployed Vercel site
- [ ] Created Strapi webhook with Authorization header
- [ ] Selected appropriate events and content types
- [ ] Tested endpoint manually
- [ ] Tested by updating content in Strapi
- [ ] Confirmed fresh content on website

## 🎉 Result

After setup, when you:
1. Create/edit/publish content in Strapi
2. The webhook automatically triggers
3. Your site updates **immediately** (seconds or minutes depending on option)
4. Visitors see fresh content right away

No more waiting for ISR expiration times! 🚀

---

## 📚 Additional Resources

- [Vercel Deploy Hooks Documentation](https://vercel.com/docs/deploy-hooks)
- [Vercel ISR Documentation](https://vercel.com/docs/incremental-static-regeneration)
- [Strapi Webhooks Documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/webhooks.html)
