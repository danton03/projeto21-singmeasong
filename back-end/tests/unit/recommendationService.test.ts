import * as recommendationFactory from "../factories/recommendationsFactory";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

beforeEach(async () => {
	jest.resetAllMocks();
	jest.clearAllMocks();
});


describe("Testa o recommendationsService - Criação de recomendações", () => {
	it("Testa a função de criação de recomendação", async () => {
		const recommendation = recommendationFactory.createRecommendation();
		jest
			.spyOn(recommendationRepository, "findByName")
			.mockResolvedValueOnce(undefined);

		jest
			.spyOn(recommendationRepository, "create")
			.mockImplementationOnce((): any => {
				return recommendation;
			});

		await recommendationService.insert(recommendation);

		expect(recommendationRepository.findByName).toBeCalled();
		expect(recommendationRepository.create).toBeCalled();
	});

	it("Testa se impede a criação de uma recomendação com nome repetido", async () => {
		const recommendation = recommendationFactory.createRecommendation();
		jest
			.spyOn(recommendationRepository, "findByName")
			.mockImplementationOnce((): any => {
				return recommendation;
			});

		const promise = recommendationService.insert(recommendation);

		expect(promise).rejects.toEqual(
			{
				type: "conflict",
				message: "Recommendations names must be unique"
			}
		);
	});
});

describe("Testa o recommendationsService - upvotes", () => {
	it("Testa o upvote em uma recomendação", async () => {
		const recommendation = recommendationFactory.getRecommendation();
		jest
			.spyOn(recommendationRepository, "find")
			.mockResolvedValueOnce(recommendation);

		jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce({
			...recommendation,
			score: recommendation.score + 1,
		});

		await recommendationService.upvote(1);

		expect(recommendationRepository.find).toBeCalled();
		expect(recommendationRepository.updateScore).toBeCalled();
	});

	it("Testa a falha do upvote em recomendação inexistente", async () => {
		jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
    
		const promise = recommendationService.upvote(5);
		expect(promise).rejects.toEqual(
			{
				type: "not_found",
				message: ""
			}
		);
	});
});
