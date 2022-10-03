/* button-test */

describe("Test Cases", () => {
  it("Button", () => {
    cy.login("user");
    cy.visit("/#/cloudio/button-test");
    cy.wait(5000);
    cy.get("div[id=io-page-wrapper]").should("exist");
    cy.get("div[id=io-page-wrapper]")
      .find("button")
      .should("have.length", 11);
    cy.wait(500);
    cy.get("div[id=io-page-wrapper]").matchImageSnapshot("buttons-snap");
  });
});
