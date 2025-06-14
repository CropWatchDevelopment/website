import { test, expect } from '@playwright/test';

test.describe('static pages', () => {
  test('about page loads', async ({ page }) => {
    await page.goto('/about-us');
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('contact page displays form', async ({ page }) => {
    await page.goto('/contact-us');
    await expect(page.locator('form')).toBeVisible();
  });

  test('privacy policy page loads', async ({ page }) => {
    await page.goto('/privacy-policy');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('product pages', () => {
  test('cw-air-th product page', async ({ page }) => {
    await page.goto('/product/cw-air-th');
    await expect(page.locator('h1')).toContainText('CropWatch Air Temperature');
  });

  test('cw-ss product page', async ({ page }) => {
    await page.goto('/product/cw-ss');
    await expect(page.locator('h1')).toContainText('CropWatch Soil Sensor');
  });
});
