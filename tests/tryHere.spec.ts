import { expect, Page, chromium } from "@playwright/test";
import { test } from "../custom/fixtiures";

test.describe(()=>{
  test("Navigate to Google", async ({ todoPage }) => {
    await todoPage.pause();
  });
  
  test("Search for Playwright", async ({ todoPage }) => {
    await todoPage.pause();
  });
})

