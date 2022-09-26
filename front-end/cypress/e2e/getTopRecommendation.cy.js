/* eslint-disable no-undef */
beforeEach(() => {
	cy.resetDatabase();
	cy.seedDatabase();
});

describe("Teste E2E - Lista o top 10 recomendações", () => {
	it("Deve dar um upvote com sucesso", () => {
		cy.visit("http://localhost:3000");
		
		cy.intercept("GET", "/recommendations").as("getRecommendations");
		cy.wait("@getRecommendations");
		
		cy.get("[data-cy=topButton]").click();

		cy.url().should("equal", "http://localhost:3000/top");
	});
});