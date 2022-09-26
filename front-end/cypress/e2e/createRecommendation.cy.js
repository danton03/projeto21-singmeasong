/* eslint-disable no-undef */
beforeEach(() => {
	cy.resetDatabase();
});

describe("Teste E2E - Criar Recomendação", () => {
	const recommendation = {
		name: "Jean Tassy - Down",
		link: "https://www.youtube.com/watch?v=KstyudD7NiU"
	};

	it("Testa se cria uma recomendação corretamente", () => {
		cy.visit("http://localhost:3000");

		cy.get("[data-cy=input-name]").type(recommendation.name);
		cy.get("[data-cy=input-youtubeLink]").type(recommendation.link);

		cy.intercept("POST", "/recommendations").as("postRecommendation");
		cy.intercept("GET", "/recommendations").as("getRecommendations");

		cy.get("[data-cy=submitRecommendation]").click();

		cy.wait("@postRecommendation");
		cy.wait("@getRecommendations");

		cy.contains("Jean Tassy - Down");
		cy.contains(recommendation.name).should("be.visible");
	});
});