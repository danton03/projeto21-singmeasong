import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/database";
import * as recommendationFactory from "../factories/recommendationsFactory";

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

describe("Testa a rota GET /recommendations", () => {
	it("Deve retornar somente as 10 últimas recomendações", async () => {
		await generateTenRecommendations();
		const result = await supertest(app).get("/recommendations");
		expect(result.body).toBeInstanceOf(Array);
		expect(result.body.length).toEqual(10);
	});
});

describe("Testa a rota GET /recommendations/:id", () => {
	it("Deve retornar uma recomendação buscada pelo ID", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await createRecommendation(newRecommendation);
		const result = await supertest(app).get("/recommendations/1");
		expect(result.body).toBeInstanceOf(Object);
		expect(Object.keys(result.body).length).toBeGreaterThan(0);
	});

	it("Deve retornar 404 ao não encontrar a recomendação com o ID enviado", async () => {
		const result = await supertest(app).get("/recommendations/1");
		expect(result.status).toEqual(404);
	});
});

describe("Testa a rota GET /recommendations/random", () => {
	it("Retorna com sucesso uma recomendação aleatória", async () => {
		const newRecommendation = recommendationFactory.createRecommendation();
		await createRecommendation(newRecommendation);
		const result = await supertest(app).get("/recommendations/random");

		expect(result.body).toBeInstanceOf(Object);
		expect(Object.keys(result.body).length).toBeGreaterThan(0);
	});

	it("Deve retornar status 404 se não houver recomendações cadastradas", async () => {
		const result = await supertest(app).get("/recommendations/random");

		expect(result.status).toEqual(404);
	});
});

describe("Testa a rota GET /recommendations/top/:amount", () => {
	it("Deve retornar as X recomendações com mais votos", async () => {
		await generateTenRecommendations();
		await generateUpvotes();

		const result = await supertest(app).get(`/recommendations/top/${3}`);

		expect(result.body).toBeInstanceOf(Array);
		expect(result.body.length).toEqual(3);
		expect(result.body[0].score).toBeGreaterThanOrEqual(result.body[1].score);
		expect(result.body[1].score).toBeGreaterThanOrEqual(result.body[2].score);
	});
});

async function createRecommendation(
	newRecommendation: recommendationFactory.INewRecommendation
) {
	const result = await supertest(app)
		.post("/recommendations")
		.send(newRecommendation);
	return result;
}

async function sendDownvote(id: number) {
	return await supertest(app).post(`/recommendations/${id}/downvote`);
}

async function generateTenRecommendations() {
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
	await createRecommendation(recommendationFactory.createRecommendation());
}

async function generateUpvotes() {
	await supertest(app).post("/recommendations/1/upvote");
	await supertest(app).post("/recommendations/1/upvote");
	await supertest(app).post("/recommendations/1/upvote");
	await supertest(app).post("/recommendations/1/upvote");
	await supertest(app).post("/recommendations/3/upvote");
	await supertest(app).post("/recommendations/3/upvote");
	await supertest(app).post("/recommendations/2/upvote");
}