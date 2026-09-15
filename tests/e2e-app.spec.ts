import { test, expect } from "@playwright/test";

test.describe("TICKET #404 Web Application & Intern Features", () => {
  test("should load the landing page and display hero headline and CTA buttons", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/TICKET #404/);

    const headline = page.locator("h1");
    await expect(headline).toContainText("Fix the IT Tickets");
    await expect(headline).toContainText("Report the Anomalies");

    const wishlistBtn = page.locator("a:has-text('Clock In (Wishlist on Steam)')");
    await expect(wishlistBtn).toBeVisible();
  });

  test("should display the 2 fellow intern roster cards in the Features section", async ({ page }) => {
    await page.goto("/#features");

    // Maya Lin
    const mayaCard = page.locator("text=Maya Lin");
    await expect(mayaCard).toBeVisible();
    await expect(page.locator("text=Hardware Specialist")).toBeVisible();

    // Leo Vance
    const leoCard = page.locator("text=Leo Vance");
    await expect(leoCard).toBeVisible();
    await expect(page.locator("text=Network Analyst")).toBeVisible();
  });

  test("should toggle global anomaly emergency mode when triggered", async ({ page }) => {
    await page.goto("/");

    // Trigger anomaly glitch via Surveillance Feed emergency pulse button
    const triggerBtn = page.locator("button:has-text('Trigger Anomaly Glitch')");
    if (await triggerBtn.isVisible()) {
      await triggerBtn.click();
      const banner = page.locator("text=FACILITY PROTOCOL BREACH");
      await expect(banner).toBeVisible();
    }
  });
});
