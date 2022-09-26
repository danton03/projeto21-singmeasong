import { Recommendation } from "@prisma/client";
import { prisma } from "../database.js";

export type TCreateRecommendations = [Omit<Recommendation, "id">]

export async function createRecommendations(recommendations: TCreateRecommendations) {
	await prisma.recommendation.createMany({ data: recommendations });
}