import { expect, test } from '@playwright/test';

test.describe('TodoMVC activity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  test('uses the 7 recommended locators', async ({ page }) => {
    test.fixme(false, 'This annotation is shown without skipping the test.');

    await page.locator('.new-todo').evaluate((element) => {
      element.setAttribute('aria-label', 'New todo');
      element.setAttribute('title', 'New todo input');
    });

    await page.evaluate(() => {
      const logo = document.createElement('img');

      logo.alt = 'TodoMVC logo';
      document.body.appendChild(logo);
    });

    await page.getByPlaceholder('What needs to be done?').fill('Learn locators');
    await page.keyboard.press('Enter');

    await expect(page.getByRole('textbox', { name: 'New todo' })).toBeVisible();
    await expect(page.getByText('Learn locators')).toBeVisible();
    await expect(page.getByLabel('New todo')).toBeVisible();
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    await expect(page.getByAltText('TodoMVC logo')).toBeAttached();
    await expect(page.getByTitle('New todo input')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toHaveText('Learn locators');
  });

  test('adds a todo', async ({ page }) => {
    test.slow();

    await page.getByPlaceholder('What needs to be done?').fill('Make tests');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('todo-title')).toHaveText('Make tests');

    const todoCount = await page.getByTestId('todo-title').count();
    expect(todoCount).toBe(1);
  });

  test('completes a todo', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Make tests');
    await page.keyboard.press('Enter');
    await page.getByLabel('Toggle Todo').check();
    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page.getByTestId('todo-title')).not.toBeVisible();
  });

  test('deletes a todo', async ({ page }) => {
    await page.getByPlaceholder('What needs to be done?').fill('Delete me');
    await page.keyboard.press('Enter');
    await page.getByTestId('todo-title').hover();
    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText('Delete me')).not.toBeVisible();
    await expect.soft(page.getByText('todos')).toBeVisible();
  });

  test.fail('shows a failing annotation', async ({ page }) => {
    await expect(page.getByTestId('todo-title')).toBeVisible();
  });
});
