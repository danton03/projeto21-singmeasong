import { faker } from "@faker-js/faker";

export interface IRecommendation {
  name: string,
  youtubeLink: string
}

export function createRecommendation(): IRecommendation {
	return {
		name: faker.lorem.words(2),
		youtubeLink: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
	};
}

export function invalidRecommendation() {
	return {
		name: "",
		youtubeLink: "https://www.google.com/",
	};
}
