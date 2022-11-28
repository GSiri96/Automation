//@ts-nocheck
export class LogInPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#username");
    this.password = page.locator("#password");
    this.signIn = page.locator("[data-testid=signin]");
  }

  async goTo() {
    await this.page.goto("https://dev.cloudio.io/",{ waitUntil: "networkidle"});
  }

  async pages() {
    await this.page.locator("data-testid=$sidebar$-pages").click();
  }

  async pause() {
    await this.page.pause();
  }

  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signIn.click();
    await this.page.waitForLoadState("networkidle");
  }
}
