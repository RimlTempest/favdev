import { test, expect } from '@playwright/test';

const paths: string[] = ['/', '/about'];
for (const path of paths) {
  test(`VRT: ${path}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${path}`);
    await expect(page).toHaveScreenshot({
      fullPage: true,
      scale: 'device',
      maxDiffPixels: 100,
    });
  });
}
