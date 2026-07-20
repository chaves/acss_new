import { expect, test } from '@playwright/test';

test('home page foregrounds the seven latest publications', async ({ page }) => {
	await page.goto('/fr/');

	await expect(page.getByRole('heading', { level: 2, name: 'Blog' })).toBeVisible();
	await expect(page.locator('.production-wall .post-item')).toHaveCount(7);
	await expect(page.locator('a[href="https://www.linkedin.com/company/acss-psl"]')).toHaveCount(2);
	await expect(page.locator('.mission-visuals img')).toHaveCount(3);
	await expect(page.locator('.mission-carousel')).toHaveCount(0);
});

test('English blog index renders publications in the English locale', async ({ page }) => {
	await page.goto('/en/blog');

	await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
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

test('home featured publication keeps its title and date inside the card', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/fr/');

	const card = await page.locator('.home-featured-publication .post-item').boundingBox();
	const image = await page.locator('.home-featured-publication .post-image-wrapper').boundingBox();
	const content = await page.locator('.home-featured-publication .post-content').boundingBox();
	const meta = await page.locator('.home-featured-publication .post-meta').boundingBox();
	const publicationGrid = await page.locator('.home-publication-grid').boundingBox();
	const cardBottom = (card?.y ?? 0) + (card?.height ?? 0);
	const metaBottom = (meta?.y ?? 0) + (meta?.height ?? 0);

	expect(metaBottom).toBeLessThan(cardBottom);
	expect(image?.width).toBeLessThan(content?.width ?? 0);
	expect(card?.height).toBeCloseTo(publicationGrid?.height ?? 0, 0);
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

test('long-form pages share one readable text measure', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });

	await page.goto('/fr/mission');
	const reference = await page.locator('.editorial-page').boundingBox();

	for (const path of [
		'/fr/plateforme',
		'/fr/donnees/credit_series',
		'/fr/formation/psl_week_2022'
	]) {
		await page.goto(path);
		const content = await page.locator('.editorial-page, .reading-page').first().boundingBox();
		expect(content?.width).toBeCloseTo(reference?.width ?? 0, 0);
	}

	await page.goto('/fr/plateforme');
	const narrative = await page.locator('.editorial-page').boundingBox();
	const columns = await page.locator('.editorial-columns').boundingBox();
	expect(columns?.width).toBeGreaterThan(narrative?.width ?? Number.POSITIVE_INFINITY);

	await page.setViewportSize({ width: 390, height: 844 });
	for (const path of [
		'/fr/plateforme',
		'/fr/donnees/credit_series',
		'/fr/formation/psl_week_2022',
		'/fr/seminaires/nlp'
	]) {
		await page.goto(path);
		const hasHorizontalOverflow = await page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth
		);
		expect(hasHorizontalOverflow).toBe(false);
	}
});
