/// <reference types="cypress" />

import "./commands";

// workaround from https://github.com/cypress-io/add-cypress-custom-command-in-typescript/issues/2

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.getCy('greeting')
       */
      getCy(value: string): Chainable<Element>;
    }
  }
}
