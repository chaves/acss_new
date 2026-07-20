import { expect, test } from '@playwright/test';

test('home page foregrounds the seven latest publications', async ({ page }) => {
	await page.goto('/fr/');

	await expect(page.getByRole('heading', { level: 2, name: 'Blog' })).toBeVisible();
	await expect(page.locator('.posts-list .post-item')).toHaveCount(7);
});

test('English blog index renders publications in the English locale', async ({ page }) => {
	await page.goto('/en/blog');

	await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
	await expect(page.locator('.featured-publication .post-item')).toHaveCount(1);
	await expect(page.locator('.publication-grid .post-item')).toHaveCount(6);
});

test('long page titles remain compact on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/en/seminaires/acss/2026-02-04-letter-shapes-llms');

	const titleBand = page.locator('.breadcrumb-section');
	await expect(titleBand.getByRole('heading', { level: 1 })).toBeVisible();

	const box = await titleBand.boundingBox();
	expect(box?.height).toBeLessThan(320);
});
