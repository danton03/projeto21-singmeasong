/* eslint-disable no-undef */
beforeEach(() => {
	cy.resetDatabase();
	cy.seedDatabase();
});

describe("Teste E2E - Lista o top 10 recomendações", () => {
	it("Deve ir para a página /random", () => {
		cy.visit("http://localhost:3000");

		cy.intercept("GET", "/recommendations").as("getRecommendations");
		cy.wait("@getRecommendations");

		cy.get("[data-cy=random]").click();

		cy.url().should("equal", "http://localhost:3000/random");
	});
});