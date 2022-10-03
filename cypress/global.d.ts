/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(name:string,{}?:{ cacheSession: boolean }): Chainable<undefined>;
        getByTestID(
            dataTestAttribute: string | string[],
          ): Chainable<JQuery<HTMLElement>>;
        matchImageSnapshot(name:string): Chainable<undefined>;
    }
  }
  