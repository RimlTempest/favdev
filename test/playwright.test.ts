import { Page, Browser, test } from '@playwright/test';

test.setTimeout(35e3);

test('send message', async ({
  browser,
  page,
}: {
  browser: Browser;
  page: Page;
}) => {
  const viewer: Page = await browser.newPage();
  await viewer.goto('/');

  await page.goto('/api/auth/signin');
  await page.type('[name="name"]', 'test');
  await page.click('[type="submit"]');

  const nonce: string =
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .slice(0, 6) || 'nonce';
  // await page.click('[type=submit]');
  await page.type('[name=text]', nonce);
  await page.click('[type=submit]');

  viewer.close();
});

export {};
