// tests/app.spec.js
const { test, expect } = require("@playwright/test");

test.describe("Discussion App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // Adjust the URL based on your app's running location
    await page.evaluate(() => localStorage.clear()); // Clear local storage before each test
  });

  test("should display an empty post list initially", async ({ page }) => {
    const posts = await page.locator(".post");
    await expect(posts).toHaveCount(0);
  });

  test("should add a new post", async ({ page }) => {
    await page.fill('input[placeholder="Title"]', "Test Post");
    await page.fill('textarea[placeholder="Content"]', "This is a test post.");
    await page.click('button:has-text("Add Post")');

    const postTitle = await page.locator(".post h2");
    const postContent = await page.locator(".post p");
    await expect(postTitle).toHaveText("Test Post");
    await expect(postContent).toHaveText("This is a test post.");
  });

  test("should persist posts in local storage", async ({ page }) => {
    await page.fill('input[placeholder="Title"]', "Persistent Post");
    await page.fill(
      'textarea[placeholder="Content"]',
      "This post should persist."
    );
    await page.click('button:has-text("Add Post")');

    await page.reload();

    const postTitle = await page.locator(".post h2");
    const postContent = await page.locator(".post p");
    await expect(postTitle).toHaveText("Persistent Post");
    await expect(postContent).toHaveText("This post should persist.");
  });
});
