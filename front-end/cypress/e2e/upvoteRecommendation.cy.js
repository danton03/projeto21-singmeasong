/* eslint-disable no-undef */
beforeEach(() => {
	cy.resetDatabase();
});

describe("Teste E2E - Dar upvote em uma recomendação", () => {
	it("Deve dar um upvote com sucesso", () => {
		cy.visit("http://localhost:3000");

		cy.createRecommendation();

		cy.intercept("GET", "/recommendations").as("getRecommendations");
		cy.wait("@getRecommendations");

		cy.get("[data-cy=upvoteButton]").click();

		cy.get("[data-cy=score]").should(($p) => {
			expect($p).to.contain("1");
		});
	});
});