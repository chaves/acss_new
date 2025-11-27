#!/bin/bash
#
# Quick Setup Guide Helper Script
# 
# This script guides you through setting up immediate content updates
# with either Vercel Deploy Hook or On-Demand Revalidation API
#

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Immediate Content Updates Setup Guide"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Choose your preferred solution:"
echo ""
echo "1) Vercel Deploy Hook (Recommended - Simplest)"
echo "   ✅ 5-minute setup"
echo "   ✅ Guaranteed to work"
echo "   ⚠️  Full site rebuild (1-3 minutes)"
echo ""
echo "2) On-Demand Revalidation API (Faster updates)"
echo "   ✅ Only regenerates affected pages"
echo "   ✅ Updates in 10-30 seconds"
echo "   ⚠️  More complex setup (15 minutes)"
echo ""
read -p "Enter choice [1 or 2]: " choice

case $choice in
  1)
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 OPTION 1: Vercel Deploy Hook Setup"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "STEP 1: Create Vercel Deploy Hook"
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
    ;;
    
  2)
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 OPTION 2: On-Demand Revalidation API Setup"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "STEP 1: Generate Security Token"
    echo ""
    echo "Generating token..."
    TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
    echo ""
    echo "🔑 Your Security Token:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "$TOKEN"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "⚠️  IMPORTANT: Copy this token now! You won't see it again."
    echo ""
    read -p "Press Enter after you've copied the token..."
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "STEP 2: Add Token to Vercel"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Go to: https://vercel.com/dashboard"
    echo "2. Select your project"
    echo "3. Go to: Settings → Environment Variables"
    echo "4. Click: Add New"
    echo "5. Configure:"
    echo "   - Name: REVALIDATE_TOKEN"
    echo "   - Value: $TOKEN"
    echo "   - Environments: Production, Preview"
    echo "6. Click: Save"
    echo "7. Redeploy your site (or wait for next deployment)"
    echo ""
    read -p "Press Enter when you've added the token to Vercel..."
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "STEP 3: Configure Strapi Webhook"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Go to your Strapi Admin Panel"
    echo "2. Navigate to: Settings → Webhooks"
    echo "3. Click: Create new webhook"
    echo "4. Fill in:"
    echo "   - Name: Revalidate Website Pages"
    echo "   - URL: https://acss-dig.psl.eu/api/revalidate"
    echo "   - Events: Select 'entry.publish', 'entry.update'"
    echo "   - Headers: Add header"
    echo "     * Key: Authorization"
    echo "     * Value: Bearer $TOKEN"
    echo "   - Content Types: Select your content types"
    echo "5. Click: Save"
    echo ""
    read -p "Press Enter when you've configured the Strapi webhook..."
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "STEP 4: Test It!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Testing the API endpoint..."
    echo ""
    
    # Test the endpoint
    TEST_URL="https://acss-dig.psl.eu/api/revalidate?token=$TOKEN&path=/en/blog"
    echo "Test command:"
    echo "curl \"$TEST_URL\""
    echo ""
    read -p "Run test now? [y/N]: " run_test
    
    if [[ $run_test =~ ^[Yy]$ ]]; then
      echo ""
      echo "Running test..."
      curl -s "$TEST_URL" | jq '.' || curl -s "$TEST_URL"
      echo ""
    fi
    
    echo ""
    echo "1. Go to Strapi and update any content"
    echo "2. Publish the changes"
    echo "3. Wait 10-30 seconds"
    echo "4. Visit your website - fresh content should be live! 🎉"
    echo ""
    echo "✅ Setup complete! Your site will now update immediately when Strapi content changes."
    echo ""
    ;;
    
  *)
    echo ""
    echo "❌ Invalid choice. Please run the script again and choose 1 or 2."
    exit 1
    ;;
esac

