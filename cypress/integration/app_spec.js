/* eslint-disable no-undef */
describe("full run through", () => {
  it("user can log in then add, update and delete todos, then logout", () => {
    //log in
    cy.visit("http://localhost:3000/");
    cy.findByRole("textbox").type("deploy@deploy.com");
    cy.findByPlaceholderText(/password/i).type("deploy@deploy.com");
    cy.findByRole("button", { name: /log in/i }).click();
    cy.findByText("deploy@deploy.com is signed in").should(`be.visible`);
    // add a task
    cy.findByPlaceholderText(/add a new task here\.\.\./i).type(
      "clean the car"
    );
    cy.findByTestId("add-button").click();
    // update a task correctly
    cy.get("#fill-button > svg").first().click();
    cy.findByRole("textbox").clear().type("clean my bike");
    cy.findByTestId("tick-button").click();
    cy.findByText("clean my bike").should(`be.visible`);
    // update a task and cancel update
    cy.get("#fill-button > svg").first().click();
    cy.findByRole("textbox").clear().type("clean my bike");
    cy.findByTestId("cross-button").click();
    cy.findByPlaceholderText(/add a new task here\.\.\./i).should(`be.empty`);
    // delete task
    cy.get("#delete-button > svg").first().click();
    // logout
    cy.findByRole("button", { name: /log out/i }).click();
    cy.findByText("Log In").should(`be.visible`);
  });
});
