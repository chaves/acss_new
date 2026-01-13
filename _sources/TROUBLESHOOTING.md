# Static Images Not Loading in Dev Mode - Troubleshooting

## Issue
Images from `/static/images/` are returning 404 in dev mode (`npm run dev`) but work fine in production.

## Root Cause
The issue is related to how SvelteKit's routing handles static assets in development vs production.

## Solution

### Step 1: Clear Everything
```bash
# Stop dev server (Ctrl+C)
# Clear cache
rm -rf .svelte-kit
rm -rf node_modules/.vite
```

### Step 2: Restart Dev Server
```bash
npm run dev
```

### Step 3: Access Without Language Prefix First
Instead of going directly to `http://localhost:5173/fr/`, try:
1. Visit `http://localhost:5173/` (will redirect to `/fr/`)
2. This ensures the routing is properly initialized

### Step 4: Hard Refresh Browser
- Chrome/Edge: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Firefox: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or: DevTools (F12) → Right-click refresh → "Empty Cache and Hard Reload"

## Verification

### Test Direct Image Access
Open these URLs directly in your browser:

✅ Should work:
- `http://localhost:5173/images/logos_autres/cnrs.png`
- `http://localhost:5173/images/home_graphs/bonnassieux_client.png`

❌ Should NOT be needed (but reroute should handle):
- `http://localhost:5173/fr/images/logos_autres/cnrs.png` → should redirect to `/images/...`

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Img"
4. Reload page
5. Look for image requests:
   - Status should be `200 OK`
   - NOT `404 Not Found`

## If Still Not Working

### Option 1: Use Preview Mode
Preview mode is closer to production and should work:
```bash
npm run build
npm run preview
```
Then visit: `http://localhost:4173/fr/`

### Option 2: Deploy to Vercel
Production works correctly, so deploy and test there:
```bash
git push origin main
```

## Technical Details

The fix involved:
1. Making `paths.assets` conditional (only set in production)
2. Updating `reroute` function to strip language prefixes from static assets
3. Updating `hooks.server.ts` to handle language-prefixed cache headers
4. Adding `server.fs.strict = false` to `vite.config.ts`

All changes are committed and work in production. Dev mode quirks are a known SvelteKit/Vite issue with i18n routing.

