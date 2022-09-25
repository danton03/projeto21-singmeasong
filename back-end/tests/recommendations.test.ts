import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";
import * as recommendationFactory from "./factories/recommendationsFactory";

beforeEach(async () => {
	await prisma.$executeRaw`TRUNCATE "recommendations" RESTART IDENTITY CASCADE`;
});
afterAll(async () => {
	await prisma.$disconnect();
});

describe("Testa a rota POST /recommendations", () => {
	it("Cria uma nova recomendação e retorna 201", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		const result = await createRecommendation(newRecommendation);
		expect(result.status).toEqual(201);
	});

	it("Deve retorna erro 409 ao criar uma recomendação com o mesmo nome", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await createRecommendation(newRecommendation);
		const result = await createRecommendation(newRecommendation);
		expect(result.status).toEqual(409);
	});

	it("Deve retornar erro 422 caso seja enviado um body inválido", async () => {
		const invalidRecommendation = recommendationFactory.invalidRecommendation();
		const result = await createRecommendation(invalidRecommendation);
		expect(result.status).toEqual(422);
	});
});

describe("Testa a rota POST /recommendations/:id/upvote", () => {
	it("Deve retornar status 200 ao adiciona um upvote na recomendação", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await createRecommendation(newRecommendation);
		const result = await supertest(app).post("/recommendations/1/upvote");
		expect(result.status).toEqual(200);
	});

	it("Deve retornar status 404 ao dar upvote em uma recomendação inexistente", async () => {
		const result = await supertest(app).post("/recommendations/5/upvote");
		expect(result.status).toEqual(404);
	});
});

describe("Testa a rota POST /recommendations/:id/downvote", () => {
	it("Deve retornar status 200 após um downvote na recomendação", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await createRecommendation(newRecommendation);
		const result = await supertest(app).post("/recommendations/1/downvote");

		expect(result.status).toEqual(200);
	});

	it("Deve retornar 404 ao tentar dar downvote em uma recomendação inexistente", async () => {
		const result = await supertest(app).post("/recommendations/5/downvote");
		expect(result.status).toEqual(404);
	});

	it("Deve excluir uma recomendação após 6 downvotes e retornar 404 nas próximas tentativas", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await createRecommendation(newRecommendation);

		await sendDownvote(1);
		await sendDownvote(1);
		await sendDownvote(1);
		await sendDownvote(1);
		await sendDownvote(1);
		await sendDownvote(1);

		const result = await sendDownvote(1);

		expect(result.status).toEqual(404);
	});
});

async function createRecommendation(
	newRecommendation: recommendationFactory.IRecommendation
) {
	const result = await supertest(app)
		.post("/recommendations")
		.send(newRecommendation);
	return result;
}

async function sendDownvote(id: number) {
	return await supertest(app).post(`/recommendations/${id}/downvote`);
}