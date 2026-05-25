import { test } from '@playwright/test';

test('searches on MercadoLibre', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.mx/', {
    waitUntil: 'domcontentloaded',
  });

  await page.getByPlaceholder(/Buscar productos|Buscar/i).fill('audífonos');
});
