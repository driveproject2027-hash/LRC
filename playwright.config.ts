import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        channel: "chrome",
      },
    },
  ],
  webServer: {
    command: "npx vite preview --port 4173",
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
