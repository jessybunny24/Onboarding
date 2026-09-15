import { test, expect } from "@playwright/test";

test.describe("Dropdown Component & Incident Classification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("should render the dropdown with default selection and label", async ({ page }) => {
    const trigger = page.getByTestId("incident-type-dropdown-trigger");
    await expect(trigger).toBeVisible();

    // Verify initial value
    await expect(trigger).toContainText("Level 1: Environmental Shift");

    // Check ARIA attributes
    await expect(trigger).toHaveAttribute("role", "combobox");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
  });

  test("should open dropdown menu when trigger is clicked", async ({ page }) => {
    const trigger = page.getByTestId("incident-type-dropdown-trigger");
    await trigger.click();

    // Verify ARIA expanded
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Verify menu and options are visible
    const menu = page.getByTestId("incident-type-dropdown-menu");
    await expect(menu).toBeVisible();

    const options = menu.getByRole("option");
    await expect(options).toHaveCount(5);
  });

  test("should select a new option and update trigger label and badge", async ({ page }) => {
    const trigger = page.getByTestId("incident-type-dropdown-trigger");
    await trigger.click();

    // Select Level 3 Biological/Mimic Encounter
    const optionLevel3 = page.getByTestId(
      "incident-type-dropdown-option-level-3-mimic"
    );
    await expect(optionLevel3).toBeVisible();
    await optionLevel3.click();

    // Dropdown menu should close after selection
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByTestId("incident-type-dropdown-menu")).not.toBeVisible();

    // Trigger should reflect newly selected option
    await expect(trigger).toContainText("Level 3: Biological/Mimic Encounter");
    await expect(trigger).toContainText("HIGH");
  });

  test("should synchronize with the underlying native select element", async ({ page }) => {
    const trigger = page.getByTestId("incident-type-dropdown-trigger");
    await trigger.click();

    const optionLevel4 = page.getByTestId(
      "incident-type-dropdown-option-level-4-temporal"
    );
    await optionLevel4.click();

    // Native select check
    const nativeSelect = page.getByTestId(
      "incident-type-dropdown-native-select"
    );
    await expect(nativeSelect).toHaveValue("level-4-temporal");
  });

  test("should close menu when clicking outside", async ({ page }) => {
    const trigger = page.getByTestId("incident-type-dropdown-trigger");
    await trigger.click();

    const menu = page.getByTestId("incident-type-dropdown-menu");
    await expect(menu).toBeVisible();

    // Click outside on the heading
    await page.locator("h2:has-text('Submit A Support Ticket')").click();
    await expect(menu).not.toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("should submit the support ticket with the selected dropdown option", async ({ page }) => {
    // Fill out the form
    await page.locator("#contact-name").fill("Intern #09 David");
    await page.locator("#contact-email").fill("david@anomalyfacility.internal");
    await page.locator("#contact-location").fill("Room 103 - North Wing");

    // Select Level 4 Temporal Paradox in dropdown
    const trigger = page.getByTestId("incident-type-dropdown-trigger");
    await trigger.click();
    await page
      .getByTestId("incident-type-dropdown-option-level-4-temporal")
      .click();

    await page
      .locator("#contact-message")
      .fill("Spatiotemporal breach detected. Hallway length extending infinitely.");

    // Submit form
    await page.locator("button[type='submit']:has-text('Submit Ticket')").click();

    // Verify confirmation message
    await expect(
      page.locator("h3:has-text('Ticket Successfully Logged')")
    ).toBeVisible();
    await expect(page.locator("text=Thank you, Intern #09 David")).toBeVisible();
  });
});
