import { test as base } from "@playwright/test";
import { LogInPage } from "../pageObjects/LogInPage";

const test = base.extend({
  todoPage: async ({ page }, use) => {
    const todoPage = new LogInPage(page);
    use(todoPage);
  },
});

export { test };
