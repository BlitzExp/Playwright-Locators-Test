import { test } from '@playwright/test';

test('opens TodoMVC', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('adds and completes todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const newTodo = page.getByPlaceholder('What needs to be done?');

  await newTodo.fill('Study Playwright');
  await newTodo.press('Enter');
  await newTodo.fill('Buy milk');
  await newTodo.press('Enter');

  await page
    .getByRole('listitem')
    .filter({ hasText: 'Buy milk' })
    .getByRole('checkbox')
    .check();
});

test('filters completed todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const newTodo = page.getByPlaceholder('What needs to be done?');

  await newTodo.fill('Walk dog');
  await newTodo.press('Enter');
  await newTodo.fill('Wash car');
  await newTodo.press('Enter');

  await page
    .getByRole('listitem')
    .filter({ hasText: 'Wash car' })
    .getByRole('checkbox')
    .check();

  await page.getByRole('link', { name: 'Completed' }).click();
});

test('deletes a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const newTodo = page.getByPlaceholder('What needs to be done?');

  await newTodo.fill('Temporary todo');
  await newTodo.press('Enter');
  await newTodo.fill('Keep this todo');
  await newTodo.press('Enter');

  const temporaryTodo = page
    .getByRole('listitem')
    .filter({ hasText: 'Temporary todo' });

  await temporaryTodo.hover();
  await temporaryTodo.getByRole('button').click();
});
