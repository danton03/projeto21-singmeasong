/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
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

	it("Testa a falha do upvote em uma recomendação inexistente", async () => {
		jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {});
    
		const promise = recommendationService.upvote(5);
		expect(promise).rejects.toEqual(
			{
				type: "not_found",
				message: ""
			}
		);
	});
});

describe("Testa o recommendationsService - downvotes", () => {
	it("Testa o downvote em uma recomendação", async () => {
		const recommendation = recommendationFactory.getRecommendation();

		jest
			.spyOn(recommendationRepository, "find")
			.mockResolvedValueOnce(recommendation);

		jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce({
			...recommendation,
			score: recommendation.score - 1,
		});

		await recommendationService.downvote(1);

		expect(recommendationRepository.find).toBeCalled();
		expect(recommendationRepository.updateScore).toBeCalled();
	});

	it("Testa se impede o downvote em uma recomendação inexistente", async () => {
		jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {});

		const promise = recommendationService.upvote(5);
		expect(promise).rejects.toEqual(
			{
				type: "not_found",
				message: ""
			}
		);
	});

	it("Testa a deleção de uma recomendação", async () => {
		const recommendation = recommendationFactory.recommendationToDelete();

		jest
			.spyOn(recommendationRepository, "find")
			.mockResolvedValueOnce(recommendation);

		jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce({
			...recommendation,
			score: recommendation.score - 1,
		});

		jest
			.spyOn(recommendationRepository, "remove")
			.mockImplementationOnce((): any => {
				return;
			});

		await recommendationService.downvote(1);

		expect(recommendationRepository.updateScore).toBeCalled();
		expect(recommendationRepository.remove).toBeCalled();
	});
});

describe("Testa o recommendationsService - função get", () => {
	it("Testa o get das últimas 10 recomendações", async () => {
		const recommendations = [
			recommendationFactory.getRecommendation(),
			recommendationFactory.getRecommendation(),
		];

		jest
			.spyOn(recommendationRepository, "findAll")
			.mockImplementationOnce((): any => recommendations);

		await recommendationService.get();

		expect(recommendationRepository.findAll).toBeCalled();
	});
});

describe("Testa o recommendationsService - função getTop", () => {
	it("Testa o get do top X recomendações", async () => {
		jest
			.spyOn(recommendationRepository, "getAmountByScore")
			.mockImplementationOnce((): any => {});

		await recommendationService.getTop(3);

		expect(recommendationRepository.getAmountByScore).toBeCalled();
	});
});

describe("Testa o recommendationsService - recomendações aleatórias", () => {
	it("Testa o get para recomendações aleatórias com pontuação maior que 10", async () => {
		const recommendations = recommendationFactory.getSixRecommendations();

		jest.spyOn(Math, "random").mockReturnValueOnce(0.6); //gera scoreFilter "gt"

		jest
			.spyOn(Math, "floor")
			.mockReturnValueOnce(2);

		jest
			.spyOn(recommendationRepository, "findAll")
			.mockResolvedValueOnce(recommendations);

		const result = await recommendationService.getRandom();
		expect(result.score).toBeGreaterThan(10);
		expect(recommendationRepository.findAll).toBeCalled();
	});

	it("Testa o get para recomendações aleatórias com pontuação menor ou igual a 10", async () => {
		const recommendations = recommendationFactory.getSixRecommendations();

		jest.spyOn(Math, "random").mockReturnValueOnce(0.9); //gera scoreFilter "lte"

		jest
			.spyOn(Math, "floor")
			.mockReturnValueOnce(1);

		jest
			.spyOn(recommendationRepository, "findAll")
			.mockResolvedValueOnce(recommendations);

		const result = await recommendationService.getRandom();
		expect(recommendationRepository.findAll).toBeCalled();
		expect(result.score).toBeGreaterThanOrEqual(-5);
		expect(result.score).toBeLessThanOrEqual(10);
	});

	it("Deve retornar erro quando não há recomendações cadastradas", async () => {
		jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);
		jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([]);
		const promise = recommendationService.getRandom();
		expect(promise).rejects.toEqual(
			{
				type: "not_found",
				message: ""
			}
		);
	});
});