describe("Index page", () => {
  it("Should display a counter", () => {
    cy.visit("/");
    cy.getCy("count").should("have.text", "0");
    cy.getCy("inc-button").click();
    cy.getCy("count").should("have.text", "1");
  });
});
