/* eslint-disable no-undef */
beforeEach(() => {
	cy.resetDatabase();
});

describe("Teste E2E - Criar Recomendação", () => {
	it("Testa se criação de uma recomendação corretamente", () => {
		cy.visit("http://localhost:3000");

		cy.get("[data-cy=input-name]").type("Jean Tassy - Down");
		cy.get("[data-cy=input-youtubeLink]").type(
			"https://www.youtube.com/watch?v=KstyudD7NiU"
		);

		cy.intercept("POST", "/recommendations").as("postRecommendation");
		cy.intercept("GET", "/recommendations").as("getRecommendations");

		cy.get("[data-cy=submitRecommendation]").click();

		cy.wait("@postRecommendation");
		cy.wait("@getRecommendations");

		cy.contains("Jean Tassy - Down");
	});
});