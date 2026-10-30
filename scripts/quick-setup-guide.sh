#!/bin/bash
#
# Quick Setup Guide Helper Script
#
# This script guides you through setting up immediate content updates
# with a Vercel Deploy Hook called by a Strapi webhook (full site rebuild)
#

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Immediate Content Updates Setup Guide"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Strapi calls a Vercel Deploy Hook on each content change."
echo "   ✅ Refreshes prerendered pages and clears the CDN cache"
echo "   ⚠️  Full site rebuild (1-3 minutes)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1: Create Vercel Deploy Hook"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your project"
echo "3. Go to: Settings → Git"
echo "4. Scroll to: Deploy Hooks"
echo "5. Click: Create Hook"
echo "6. Configure:"
echo "   - Name: Strapi Content Update"
echo "   - Git Branch: main (or your production branch)"
echo "7. Click: Create Hook"
echo "8. Copy the webhook URL (looks like: https://api.vercel.com/v1/integrations/deploy/...)"
echo ""
read -p "Press Enter when you have the Vercel Deploy Hook URL..."
read -p "Paste your Vercel Deploy Hook URL: " vercel_url

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 2: Configure Strapi Webhook"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to your Strapi Admin Panel"
echo "2. Navigate to: Settings → Webhooks"
echo "3. Click: Create new webhook"
echo "4. Fill in:"
echo "   - Name: Trigger Vercel Deployment"
echo "   - URL: $vercel_url"
echo "   - Events: Select 'entry.publish', 'entry.update'"
echo "   - Content Types: Select your content types (post, author, seminar)"
echo "5. Click: Save"
echo ""
read -p "Press Enter when you've configured the Strapi webhook..."

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 3: Test It!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to Strapi and update any content"
echo "2. Publish the changes"
echo "3. Check Vercel Dashboard → Deployments (should see new deployment)"
echo "4. Wait 1-3 minutes for build to complete"
echo "5. Visit your website - fresh content should be live! 🎉"
echo ""
echo "✅ Setup complete! Your site will now update immediately when Strapi content changes."
echo ""
