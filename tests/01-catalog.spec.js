import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

const card = (page, name) =>
  page.locator('.card').filter({ has: page.getByRole('heading', { name, exact: true }) });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Задание 1', async ({ page }) => {
  const model = new CatalogPage(page);
  await expect(card(page, 'Apple')).toBeVisible();

  await model.search('Red Lipstick');

  await expect(page.locator('.card')).toHaveCount(1);
  await expect(card(page, 'Red Lipstick')).toBeVisible();
  await expect(card(page, 'Apple')).toHaveCount(0);
});

test('Задание 2', async ({ page }) => {
  const model = new CatalogPage(page);
  await expect(card(page, 'Apple')).toBeVisible();

  await model.selectBrand('Essence');

  await expect(page.getByRole('checkbox', { name: 'Essence', exact: true })).toBeChecked();
  await expect(card(page, 'Essence Mascara Lash Princess')).toBeVisible();
  await expect(card(page, 'Apple')).toHaveCount(0);
});

test('Задание 3', async ({ page }) => {
  const model = new CatalogPage(page);

  await model.openProduct('Red Lipstick');

  await expect(page).toHaveURL(/\/products\/4$/);
  await expect(page.getByRole('heading', { name: 'Red Lipstick', exact: true })).toBeVisible();
});

test('Задание 4', async ({ page }) => {
  const model = new CatalogPage(page);
  await expect(card(page, 'Essence Mascara Lash Princess')).toBeVisible();

  await model.nextPage();

  await expect(card(page, 'Essence Mascara Lash Princess')).toHaveCount(0);
  await expect(page.locator('.card').first()).toBeVisible();
});
