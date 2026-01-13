# 🚀 Quick Start: Immediate Content Updates

This guide gets you set up with **immediate content updates** in just 5 minutes using the recommended solution.

## ✅ Recommended Solution: Vercel Deploy Hook

**Why this solution?**
- ✅ Simplest setup (5 minutes)
- ✅ Guaranteed to work
- ✅ No code changes needed
- ✅ Reliable and battle-tested

**What it does:**
When you update content in Strapi, it automatically triggers a Vercel deployment, ensuring your site always has fresh content.

---

## 📋 Setup Steps (5 minutes)

### Step 1: Create Vercel Deploy Hook (2 minutes)

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Select your project (`acss-dig.psl.eu` or similar)

2. **Navigate to Deploy Hooks**
   - Click: **Settings** (top menu)
   - Click: **Git** (left sidebar)
   - Scroll down to: **Deploy Hooks** section

3. **Create New Hook**
   - Click: **Create Hook** button
   - Fill in:
     - **Name**: `Strapi Content Update`
     - **Git Branch**: `main` (or your production branch name)
   - Click: **Create Hook**

4. **Copy the Webhook URL**
   - You'll see a URL like: `https://api.vercel.com/v1/integrations/deploy/...`
   - **Copy this URL** - you'll need it in Step 2

### Step 2: Configure Strapi Webhook (3 minutes)

1. **Open Strapi Admin Panel**
   - Go to: https://cms.acss-psl.eu/admin (or your Strapi URL)
   - Log in

2. **Navigate to Webhooks**
   - Click: **Settings** (bottom left)
   - Click: **Webhooks** (under "Global Settings")

3. **Create New Webhook**
   - Click: **Create new webhook** button (top right)

4. **Configure the Webhook**

   **Basic Information:**
   - **Name**: `Trigger Vercel Deployment`
   - **URL**: Paste the Vercel Deploy Hook URL from Step 1

   **Events:**
   Check the boxes for:
   - ✅ `entry.publish` - When content is published
   - ✅ `entry.update` - When content is updated
   - ✅ `entry.create` - When new content is created (optional)
   - ✅ `entry.delete` - When content is deleted (optional)

   **Content Types:**
   Select which content types should trigger deployments:
   - ✅ `post` (Blog posts)
   - ✅ `author` (Team members)
   - ✅ `seminar` (Seminars)
   - Or select **All content types** if you want everything

5. **Save**
   - Click: **Save** button

### Step 3: Test It! (30 seconds)

1. **Update Content in Strapi**
   - Go to any blog post, team member, or seminar
   - Make a small change (e.g., add a word to the title)
   - Click **Save**
   - Click **Publish** (if in draft)

2. **Check Vercel Dashboard**
   - Go to: https://vercel.com/dashboard → Your Project
   - Click: **Deployments** tab
   - You should see a **new deployment starting** within seconds!

3. **Wait for Deployment**
   - Watch the deployment progress (usually 1-3 minutes)
   - Wait for it to complete (status will show "Ready")

4. **Verify on Website**
   - Visit your website
   - Check that your changes appear
   - 🎉 **Success!** Your content updates automatically!

---

## 🎉 That's It!

Your site will now automatically update whenever you change content in Strapi. No more waiting for ISR expiration times!

### How It Works

```
1. You update content in Strapi
   ↓
2. Strapi webhook triggers
   ↓
3. Calls Vercel Deploy Hook
   ↓
4. Vercel starts new deployment
   ↓
5. Build fetches fresh data from Strapi
   ↓
6. Site deploys with updated content (1-3 minutes)
   ↓
7. All visitors see fresh content! ✨
```

---

## 🔧 Helper Scripts

We've created helper scripts to make setup even easier:

### Generate Security Token (for Option 2 only)

```bash
node scripts/generate-revalidate-token.js
```

### Test Webhook

```bash
node scripts/test-webhook.js <webhook-url>
```

### Interactive Setup Guide

```bash
./scripts/quick-setup-guide.sh
```

---

## ❓ Troubleshooting

### Webhook Not Triggering?

1. **Check Strapi Webhook Status**
   - Go to Strapi → Settings → Webhooks
   - Click on your webhook
   - Check "Last trigger" - should show recent timestamp
   - Check response status (should be 200)

2. **Check Vercel Deploy Hook**
   - Go to Vercel → Settings → Git → Deploy Hooks
   - Verify the hook exists and is active
   - Click "Send Test" to manually trigger

3. **Verify Events Selected**
   - Make sure you selected the right events (`entry.publish` is most important)
   - Make sure you selected the right content types

### Deployment Not Starting?

1. **Check Webhook URL**
   - Verify the URL in Strapi matches exactly the Vercel Deploy Hook URL
   - Make sure there are no extra spaces

2. **Check Branch Name**
   - Verify the Deploy Hook branch matches your production branch
   - Default is usually `main` or `master`

3. **Check Deployment History**
   - Go to Vercel → Deployments
   - Look for any failed deployments
   - Check deployment logs for errors

### Content Still Not Updating?

1. **Wait for Build to Complete**
   - Deployments take 1-3 minutes
   - Wait until status shows "Ready" in Vercel dashboard

2. **Clear Browser Cache**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

3. **Verify Content Published**
   - In Strapi, make sure content is actually published (not draft)
   - Check "Published at" date in Strapi

---

## 📚 Next Steps

- **Read Full Guide**: See `ON_DEMAND_REVALIDATION_SETUP.md` for detailed documentation
- **Alternative Solution**: If you need faster updates (10-30 seconds vs 1-3 minutes), see Option 2 in the full guide
- **Monitor Deployments**: Check Vercel dashboard regularly to ensure webhooks are working

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Vercel Deploy Hook created
- [ ] Strapi webhook created and configured
- [ ] Tested by updating content in Strapi
- [ ] New deployment appeared in Vercel dashboard
- [ ] Deployment completed successfully
- [ ] Fresh content visible on website

---

**Questions?** Check the full setup guide: `ON_DEMAND_REVALIDATION_SETUP.md`

