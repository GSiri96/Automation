// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('login', (name, { cacheSession = true } = {}) => {
    const login = () => {
      cy.visit('/')
      cy.get('input[id=username]').type("admin");
      cy.get('input[id=password]').type("u6c0mm0n@123L");
      cy.get('button[data-testid=signin]').click();
      cy.get('div[id=io-page-wrapper]',{timeout:15000}).should("exist");
    }
    if (cacheSession) {
      cy.session(name, login)
    } else {
      login()
    }
})

Cypress.Commands.add('getByTestID', (selector) => {
  return cy.get(`[data-testid=${selector}]`, { timeout: 10000 });
});