import * as e2eRepository from "../repositories/e2eRepository.js";
import * as seedRepository from "../repositories/seedRepository.js";
import * as recommendationFactory from "../../tests/factories/recommendationsFactory.js";

export async function populateDatabase() {
	await seedRepository.createRecommendations(
		recommendationFactory.generateRecommendations(6)
	);
}

export async function resetDatabase() {
	await e2eRepository.resetDatabase();
}