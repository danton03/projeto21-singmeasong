import * as e2eRepository from "../repositories/e2eRepository";
import * as seedRepository from "../repositories/seedRepository";
import * as recommendationFactory from "../../tests/factories/recommendationsFactory";

export async function populateDatabase() {
	await seedRepository.createRecommendations(
		recommendationFactory.generateRecommendations(6)
	);
}

export async function resetDatabase() {
	await e2eRepository.resetDatabase();
}