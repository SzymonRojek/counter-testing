/// <reference types="cypress" />

describe("renders the counter", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("#container").should("exist");
    cy.get("[data-test=text], [data-test=counter]").contains(
      "Counter result: 0"
    );
    cy.get("[data-test=add-btn]").contains("+").should("have.text", "+");
    cy.get("[data-test=sub-btn]").contains("-").should("have.text", "-");
    cy.get("[data-test=change-btn]")
      .contains("Change")
      .should("have.text", "Change");
    cy.get("[data-test=reset-btn]")
      .contains("Reset")
      .should("have.text", "Reset");
    cy.get("[data-test=input-num]");
  });

  it("should increment value from 0 to 2", () => {
    cy.get("[data-test=counter]").contains("0");
    cy.get("[data-test=add-btn]").dblclick();
    cy.get("[data-test=counter]").contains("2");
  });

  it("should decrement value from 0 to -2", () => {
    cy.get("[data-test=counter]").contains("2");
    cy.get("[data-test=sub-btn").dblclick().dblclick();
    cy.get("[data-test=counter]").contains("-2");
  });

  it("should set input value to 200, change the counter by submit button, decrement value to 196", () => {
    cy.get("[data-test=input-num").type(200);
    cy.get("form").submit();
    cy.get("[data-test=counter]").contains("200");
    cy.get("[data-test=sub-btn").dblclick().dblclick();
    cy.get("[data-test=counter]").contains("196");
  });

  it("should reset the counter to default value", () => {
    cy.get("[data-test=reset-btn").click();
    cy.get("[data-test=counter]").contains("0");
  });

  it("get random number and add it to the input, then to the counter as a value", () => {
    cy.get("[data-test=input-num]").type(randomNumber());
    cy.get("form").submit();
    cy.get("[data-test=sub-btn").dblclick().dblclick();
  });
});

function randomNumber() {
  return Math.floor(Math.random() * 1000);
}
