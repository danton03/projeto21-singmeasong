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
		const result = await supertest(app)
			.post("/recommendations")
			.send(newRecommendation);
		expect(result.status).toEqual(201);
	});

	it("Deve retorna erro 409 ao criar uma recomendação com o mesmo nome", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await supertest(app)
			.post("/recommendations")
			.send(newRecommendation);
		const result = await supertest(app)
			.post("/recommendations")
			.send(newRecommendation);
		expect(result.status).toEqual(409);
	});

	it("Deve retornar erro 422 caso seja enviado um body inválido", async () => {
		const invalidRecommendation = recommendationFactory.invalidRecommendation();
		const result = await supertest(app)
			.post("/recommendations")
			.send(invalidRecommendation);
		expect(result.status).toEqual(422);
	});
});