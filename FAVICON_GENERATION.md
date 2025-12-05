# Favicon Generation Instructions

The favicon has been updated to use the ACSS-PSL logo. An SVG favicon (`/static/favicon.svg`) has been created and is now being used.

## Current Setup

- ✅ **SVG Favicon**: `/static/favicon.svg` - Works in modern browsers
- ⚠️ **PNG Favicons**: The existing PNG files (`favicon-32x32.png`, `favicon-16x16.png`) still use the old default Svelte favicon
- ⚠️ **ICO File**: The `favicon.ico` file still uses the old default favicon

## To Complete the Favicon Replacement

To replace the PNG and ICO files with versions from the logo, you can:

### Option 1: Use an Online Favicon Generator

1. Visit a favicon generator like:
   - https://realfavicongenerator.net/
   - https://favicon.io/
   - https://www.favicon-generator.org/

2. Upload `/static/favicon.svg` or `/static/images/logos/acss_logo.svg`

3. Generate and download all favicon sizes

4. Replace the files in `/static/`:
   - `favicon.ico`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`
   - `safari-pinned-tab.svg`

### Option 2: Use ImageMagick (Command Line)

```bash
# Install ImageMagick if not already installed
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Convert SVG to PNG sizes
convert static/favicon.svg -resize 16x16 static/favicon-16x16.png
convert static/favicon.svg -resize 32x32 static/favicon-32x32.png
convert static/favicon.svg -resize 180x180 static/apple-touch-icon.png
convert static/favicon.svg -resize 192x192 static/android-chrome-192x192.png
convert static/favicon.svg -resize 512x512 static/android-chrome-512x512.png

# Create ICO file
convert static/favicon-16x16.png static/favicon-32x32.png static/favicon.ico
```

### Option 3: Use Node.js Script

You can use packages like `sharp` or `svg2img` to programmatically convert the SVG to all required formats.

## Current Status

The SVG favicon is now active and will be used by modern browsers. The PNG/ICO fallbacks will continue to show the old favicon until they are replaced.

