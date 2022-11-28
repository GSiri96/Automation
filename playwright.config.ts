import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests/sidebar",
  timeout: 60 * 1000,
  expect: {
    timeout: 60 * 1000,
  },
  workers: 1,
  //globalSetup: "./global-setup",
  use: {
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: "storageState.json",
    screenshot: "only-on-failure",
    video:'on',
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "Google Chrome",
    //   use: {
    //     channel: "chrome",
    //   },
    // },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};
export default config;
