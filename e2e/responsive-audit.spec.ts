import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "375px Mobile", width: 375, height: 667 },
  { name: "768px Tablet", width: 768, height: 1024 },
  { name: "1024px Laptop", width: 1024, height: 768 },
  { name: "1440px Desktop", width: 1440, height: 900 },
];

const PAGES = [
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

test.describe("Website-Wide Responsive & Visual Integrity Audit", () => {
  for (const vp of VIEWPORTS) {
    test.describe(`Viewport: ${vp.name} (${vp.width}x${vp.height})`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      for (const pageInfo of PAGES) {
        test(`${pageInfo.name} (${pageInfo.path}) has zero horizontal overflow, valid images, and clean console`, async ({
          page,
        }) => {
          const consoleErrors: string[] = [];
          page.on("console", (msg) => {
            if (msg.type() === "error") {
              const text = msg.text();
              // Ignore intentional 404 test log
              if (!text.includes("404 Error:")) {
                consoleErrors.push(text);
              }
            }
          });

          await page.goto(pageInfo.path, { waitUntil: "domcontentloaded" });

          // Wait a tick for layouts to stabilize
          await page.waitForTimeout(400);

          // 1. Horizontal overflow check
          const overflowData = await page.evaluate(() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            return {
              hasOverflow: docWidth > winWidth + 2, // 2px margin for subpixel rounding
              docWidth,
              winWidth,
            };
          });

          expect(
            overflowData.hasOverflow,
            `Horizontal overflow on ${pageInfo.name} at ${vp.width}px: scrollWidth=${overflowData.docWidth} > innerWidth=${overflowData.winWidth}`,
          ).toBe(false);

          // 2. Broken image check (images with naturalWidth === 0 after load)
          const brokenImages = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll("img"));
            return imgs
              .filter((img) => img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith("data:"))
              .map((img) => ({ src: img.src, alt: img.alt }));
          });

          expect(
            brokenImages,
            `Broken images found on ${pageInfo.name} at ${vp.width}px: ${JSON.stringify(brokenImages)}`,
          ).toHaveLength(0);

          // 3. Floating WhatsApp button should be visible and not offscreen
          const whatsappBtn = page.getByRole("link", { name: /chat with laya on whatsapp/i });
          if (await whatsappBtn.isVisible()) {
            const box = await whatsappBtn.boundingBox();
            expect(box).not.toBeNull();
            if (box) {
              expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 10);
              expect(box.y + box.height).toBeLessThanOrEqual(vp.height + 10);
            }
          }

          // 4. Console errors check
          expect(consoleErrors).toHaveLength(0);
        });
      }
    });
  }

  test("Hero photo caption and metadata are visible within the initial viewport", async ({ page }) => {
    // Standard laptop/desktop viewport with browser chrome (780px available height)
    await page.setViewportSize({ width: 1440, height: 780 });
    await page.goto("/");
    const caption = page.getByText(/Eastern Ghats/i).first();
    await expect(caption).toBeVisible();
    const box = await caption.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.y + box.height).toBeLessThanOrEqual(780);
    }
  });
});
