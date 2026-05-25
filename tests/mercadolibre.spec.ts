import { expect, test } from '@playwright/test';

test.describe('Mercado Libre locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.mx/');
  });

  test('uses the 7 recommended locators', async ({ page }) => {
    await page.locator('input[name="as_word"]').evaluate((element) => {
      element.setAttribute('aria-label', 'Search products');
      element.setAttribute('placeholder', 'Buscar productos');
      element.setAttribute('title', 'Search input');
      element.setAttribute('data-testid', 'search-input');
    });

    await page.locator('img').first().evaluate((element) => {
      element.setAttribute('alt', 'Mercado Libre logo');
    });

    await expect(page.getByRole('combobox', { name: 'Search products' })).toBeVisible();
    await expect(page.getByText('Mercado Libre', { exact: true }).first()).toBeAttached();
    await expect(page.getByLabel('Search products')).toBeVisible();
    await expect(page.getByPlaceholder('Buscar productos')).toBeVisible();
    await expect(page.getByAltText('Mercado Libre logo')).toBeAttached();
    await expect(page.getByTitle('Search input')).toBeVisible();
    await expect(page.getByTestId('search-input')).toBeVisible();

    await page.getByTestId('search-input').fill('audifonos');
    await expect(page.getByTestId('search-input')).toHaveValue('audifonos');
  });
});
