import { test, expect, type Page } from "@playwright/test";

/**
 * LAYA Website — End-to-End Real-Browser Smoke Tests
 *
 * Verifies key user flows, responsive rendering, landmark structure,
 * and error recovery in real Chromium (Google Chrome channel).
 */

const setupErrorTracking = (page: Page, allowedErrors: (string | RegExp)[] = []) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => {
    const msg = err.message || String(err);
    const isAllowed = allowedErrors.some((pattern) =>
      typeof pattern === "string" ? msg.includes(pattern) : pattern.test(msg),
    );
    if (!isAllowed) {
      errors.push(msg);
    }
  });
  return errors;
};

test.beforeEach(async ({ page }) => {
  // Prevent any outbound contact submissions or analytics requests from leaking
  await page.route("**/api/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Mocked API response" }),
    }),
  );
  await page.route("**/wp-json/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true, message: "Mocked WordPress response" }),
    }),
  );
});

test.describe("LAYA Web Application Smoke Suite", () => {
  test("1. Home page loads without fatal JS errors and passes responsive sanity checks", async ({
    page,
  }) => {
    const pageErrors = setupErrorTracking(page);

    await page.goto("/");
    // Hero carousel contains slides with h1 headings; inspect the first active slide
    await expect(page.locator("h1").first()).toBeVisible();

    // Verify critical landmarks
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();

    // Check responsive horizontal overflow (allowing sub-pixel rendering variation)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify no unhandled exceptions occurred
    expect(pageErrors).toHaveLength(0);
  });

  test("2. Primary navigation works and loads destination page", async ({ page, isMobile }) => {
    const pageErrors = setupErrorTracking(page);
    await page.goto("/");

    if (isMobile) {
      // In mobile viewport, use the hamburger menu
      const menuBtn = page.getByRole("button", { name: /open menu/i });
      await expect(menuBtn).toBeVisible();
      await menuBtn.click();

      const drawer = page.getByRole("dialog");
      await expect(drawer).toBeVisible();
      const contactLink = drawer.getByRole("link", { name: "Contact" });
      await contactLink.click();
    } else {
      // In desktop viewport, click Contact link in header
      const contactLink = page.getByRole("banner").getByRole("link", { name: /contact/i }).first();
      await contactLink.click();
    }

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole("heading", { level: 1, name: "Contact" })).toBeVisible();
    expect(pageErrors).toHaveLength(0);
  });

  test("3. Mobile navigation drawer opens and closes properly", async ({ page, isMobile }) => {
    if (!isMobile) {
      await page.setViewportSize({ width: 375, height: 667 });
    }

    const pageErrors = setupErrorTracking(page);
    await page.goto("/");

    const menuBtn = page.getByRole("button", { name: /open menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

    // Expand "About" section inside drawer and verify child link is shown
    const aboutSectionBtn = drawer.getByRole("button", { name: "About" });
    if (await aboutSectionBtn.isVisible()) {
      await aboutSectionBtn.click();
      await expect(drawer.getByRole("link", { name: /who we are/i })).toBeVisible();
    }

    // Dismiss drawer via close button
    const closeBtn = drawer.getByRole("button", { name: /close menu/i });
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();

    expect(pageErrors).toHaveLength(0);
  });

  test("4. Unknown route renders the custom 404 page with home link", async ({ page }) => {
    // NotFound logs an intentional 404 message to console.error
    const pageErrors = setupErrorTracking(page, [/404 Error: User attempted to access non-existent route/]);

    await page.goto("/unmatched-unknown-test-path-12345");
    await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();

    const returnHomeLink = page.getByRole("link", { name: /return to home/i });
    await expect(returnHomeLink).toBeVisible();
    await returnHomeLink.click();

    await expect(page).toHaveURL(/\//);
    expect(pageErrors).toHaveLength(0);
  });

  test("5. Contact form displays accessible validation errors on invalid input", async ({
    page,
  }) => {
    const pageErrors = setupErrorTracking(page);
    await page.goto("/contact");

    // Check form inputs have accessible labels
    const nameInput = page.getByLabel(/^name/i);
    const emailInput = page.getByLabel(/^email/i);
    const messageInput = page.getByLabel(/^message/i);
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();

    // Submit empty form
    const submitBtn = page.getByRole("button", { name: /send message/i });
    await submitBtn.click();

    // Required field validation alerts must appear
    const alerts = page.getByRole("alert");
    await expect(alerts.first()).toBeVisible();
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");

    // Check invalid email format validation
    await nameInput.fill("Test User");
    await emailInput.fill("invalid-email-string");
    await messageInput.fill("Valid message text that meets minimum length.");
    await submitBtn.click();

    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(pageErrors).toHaveLength(0);
  });

  test("6. Publications page loads and search/filter interactions work", async ({ page }) => {
    const pageErrors = setupErrorTracking(page);
    await page.goto("/publications");

    // Verify search input exists
    const searchInput = page.getByPlaceholder(/search by title, topic or type/i);
    await expect(searchInput).toBeVisible();

    // Filter by typing 'mussel'
    await searchInput.fill("mussel");
    await expect(
      page.getByRole("heading", { level: 3, name: "Training in Integrated Mussel Farming" }),
    ).toBeVisible();

    // Clear filters
    const clearBtn = page.getByRole("button", { name: /clear all/i });
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await expect(searchInput).toHaveValue("");
    }

    expect(pageErrors).toHaveLength(0);
  });

  test("7. Gallery visual archive lightbox opens, navigates, and closes", async ({ page }) => {
    const pageErrors = setupErrorTracking(page);
    await page.goto("/gallery");

    // Click the first archive plate media button
    const firstPlate = page.locator("button.plate__media").first();
    await expect(firstPlate).toBeVisible();
    await firstPlate.click();

    // Lightbox dialog should open
    const lightbox = page.getByRole("dialog");
    await expect(lightbox).toBeVisible();

    // Test keyboard navigation
    await page.keyboard.press("ArrowRight");

    // Test Escape to close
    await page.keyboard.press("Escape");
    await expect(lightbox).not.toBeVisible();

    expect(pageErrors).toHaveLength(0);
  });

  test("8. Donate page communicates honest bank transfer / pledge process", async ({ page }) => {
    const pageErrors = setupErrorTracking(page);
    await page.goto("/donate");

    // Verify honest bank transfer messaging
    await expect(page.locator("body")).toContainText(/bank transfer/i);
    await expect(page.locator("body")).toContainText(/nothing is charged here/i);

    // Verify pledge form fields and clear disclaimer
    await expect(page.getByRole("button", { name: /record my intention to give/i })).toBeVisible();

    expect(pageErrors).toHaveLength(0);
  });

  test("9. Resource Centre sticky filters remain opaque with elevation when scrolled", async ({
    page,
  }) => {
    const pageErrors = setupErrorTracking(page);
    await page.goto("/publications");

    const filters = page.locator(".res-filters");
    await expect(filters).toBeVisible();

    // Verify background color is not transparent
    const bg = await filters.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
    expect(bg).not.toBe("transparent");

    // Scroll down inside laya-scroll-root
    await page.evaluate(() => {
      const scrollRoot = document.getElementById("laya-scroll-root");
      if (scrollRoot) scrollRoot.scrollTop = 500;
    });

    await page.waitForTimeout(200);

    // Filters remain visible and properly positioned at sticky top
    await expect(filters).toBeVisible();

    // Also verify /about/financial-reports (Foreign Contribution Reports page)
    await page.goto("/about/financial-reports");
    const fcraFilters = page.locator(".res-filters");
    await expect(fcraFilters).toBeVisible();
    const fcraBg = await fcraFilters.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(fcraBg).not.toBe("rgba(0, 0, 0, 0)");
    expect(fcraBg).not.toBe("transparent");

    // Scroll down
    await page.evaluate(() => {
      const scrollRoot = document.getElementById("laya-scroll-root");
      if (scrollRoot) scrollRoot.scrollTop = 400;
    });
    await page.waitForTimeout(200);
    await expect(fcraFilters).toBeVisible();

    expect(pageErrors).toHaveLength(0);
  });
});

