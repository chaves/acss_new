import { expect, test } from '@playwright/test';

test('home page foregrounds the seven latest publications', async ({ page }) => {
	await page.goto('/fr/');

	await expect(page.getByRole('heading', { level: 2, name: 'Blog' })).toBeVisible();
	await expect(page.locator('.production-wall .post-item')).toHaveCount(7);
	await expect(page.locator('.blog-count')).toHaveText('07');
});

test('English blog index renders publications in the English locale', async ({ page }) => {
	await page.goto('/en/blog');

	await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
	await expect(page.locator('.catalogue-count')).toHaveText('07');
	await expect(page.locator('.featured-publication .post-item')).toHaveCount(1);
	await expect(page.locator('.publication-grid .post-item')).toHaveCount(6);
});

test('blog imagery stays compact on desktop', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/en/blog');

	const featuredImage = await page.locator('.featured-publication .post-image-wrapper').boundingBox();
	const cardImage = await page.locator('.publication-grid .post-image-wrapper').first().boundingBox();

	expect(featuredImage?.height).toBeLessThan(350);
	expect(cardImage?.height).toBeLessThan(220);
});

test('platform title renders its approved rich formatting', async ({ page }) => {
	await page.goto('/fr/plateforme');

	const title = page.locator('.breadcrumb-title');
	await expect(title).not.toContainText('<span');
	await expect(title.locator('.site_blue, .site_red')).toHaveCount(2);
	await expect(title.locator('br')).toHaveCount(1);
});

test('long page titles remain compact on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/en/seminaires/acss/2026-02-04-letter-shapes-llms');

	const titleBand = page.locator('.breadcrumb-section');
	await expect(titleBand.getByRole('heading', { level: 1 })).toBeVisible();

	const box = await titleBand.boundingBox();
	expect(box?.height).toBeLessThan(320);
});
