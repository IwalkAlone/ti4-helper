Cypress.Commands.add("getCy", (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});
