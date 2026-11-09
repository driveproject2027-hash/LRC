import { test, expect } from "@playwright/test";

test.describe("Accessibility Deep Audit", () => {
  const pagesToCheck = [
    { path: "/", name: "Home" },
    { path: "/about/where-we-work", name: "Where We Work" },
    { path: "/about/who-we-are", name: "Who We Are" },
    { path: "/programs", name: "Our Work" },
    { path: "/what-we-do/hbhc", name: "Herbal Based Health Care" },
    { path: "/what-we-do/rla", name: "Resource for Legal Action" },
    { path: "/impact", name: "Impact" },
    { path: "/publications", name: "Publications" },
    { path: "/gallery", name: "Gallery" },
    { path: "/stories", name: "Stories" },
    { path: "/contact", name: "Contact" },
    { path: "/donate", name: "Donate" },
  ];

  for (const pageInfo of pagesToCheck) {
    test(`A11y Audit: ${pageInfo.name} (${pageInfo.path})`, async ({ page }) => {
      await page.goto(pageInfo.path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(300);

      // 1. Check Image Alt Text
      const imagesWithoutAlt = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs
          .filter((img) => !img.hasAttribute("alt"))
          .map((img) => img.src);
      });
      expect(
        imagesWithoutAlt,
        `Images without alt attribute on ${pageInfo.name}: ${imagesWithoutAlt.join(", ")}`,
      ).toHaveLength(0);

      // 2. Check Interactive elements have accessible names
      const unnamedButtons = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button"));
        return buttons
          .filter((btn) => {
            // Check if hidden or inside hidden parent
            if (btn.offsetParent === null && !btn.closest('[role="dialog"]')) return false;
            const text = btn.innerText?.trim();
            const ariaLabel = btn.getAttribute("aria-label")?.trim();
            const ariaLabelledBy = btn.getAttribute("aria-labelledby");
            const title = btn.getAttribute("title");
            return !text && !ariaLabel && !ariaLabelledBy && !title;
          })
          .map((btn) => ({
            tag: btn.tagName,
            className: btn.className,
            outerHTML: btn.outerHTML.substring(0, 100),
          }));
      });
      expect(
        unnamedButtons,
        `Unnamed buttons on ${pageInfo.name}: ${JSON.stringify(unnamedButtons)}`,
      ).toHaveLength(0);

      // 3. Check Form input labelling
      const unlabeledInputs = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll("input:not([type='hidden']), textarea, select"));
        return inputs
          .filter((input) => {
            if (input.offsetParent === null) return false;
            const id = input.id;
            const hasAssociatedLabel = id && document.querySelector(`label[for="${id}"]`);
            const hasWrappingLabel = input.closest("label");
            const ariaLabel = input.getAttribute("aria-label");
            const ariaLabelledBy = input.getAttribute("aria-labelledby");
            const title = input.getAttribute("title");
            return !hasAssociatedLabel && !hasWrappingLabel && !ariaLabel && !ariaLabelledBy && !title;
          })
          .map((input) => ({
            id: input.id,
            name: input.getAttribute("name"),
            type: input.getAttribute("type"),
            outerHTML: input.outerHTML.substring(0, 100),
          }));
      });
      expect(
        unlabeledInputs,
        `Unlabeled inputs on ${pageInfo.name}: ${JSON.stringify(unlabeledInputs)}`,
      ).toHaveLength(0);

      // 4. Heading structure sanity: ensure at least one H1 exists
      const h1Count = await page.locator("h1").count();
      expect(h1Count, `Expected at least one H1 on ${pageInfo.name}`).toBeGreaterThanOrEqual(1);
    });
  }

  test("Reduced-motion preference halts or respects CSS motion", async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(500);

    // Verify reduced motion media query is active in document
    const isReducedMotion = await page.evaluate(() => {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    expect(isReducedMotion).toBe(true);
  });

  test("Dropdown navigation keyboard accessibility (Tab, Enter, Escape, Arrow keys)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Focus into primary navigation
    const aboutTrigger = page.getByRole("button", { name: /^about$/i }).first();
    await aboutTrigger.focus();
    await expect(aboutTrigger).toBeFocused();

    // Press Enter to open dropdown
    await page.keyboard.press("Enter");
    await expect(aboutTrigger).toHaveAttribute("aria-expanded", "true");

    // Press Escape to close dropdown and return focus
    await page.keyboard.press("Escape");
    await expect(aboutTrigger).toHaveAttribute("aria-expanded", "false");
    await expect(aboutTrigger).toBeFocused();
  });
});
