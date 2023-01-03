import { PlaywrightTestConfig, devices } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
console.log(`ℹ️ Using base URL "${baseUrl}"`);

const opts = {
  // launch headless on CI, in browser locally
  headless: !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS,
  // collectCoverage: !!process.env.PLAYWRIGHT_HEADLESS
};
const config: PlaywrightTestConfig = {
  testDir: './test',
  timeout: 60000,
  webServer: {
    command: 'yarn dx',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: baseUrl,
    headless: opts.headless,
  },
};

export default config;
