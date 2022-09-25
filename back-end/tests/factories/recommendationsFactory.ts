import { faker } from "@faker-js/faker";

export function createRecommendation() {
	return {
		name: faker.lorem.words(2),
		youtubeLink: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
	};
}

export function invalidRecommendation() {
	return {
		name: 1234,
		youtubeLink: "https://www.google.com/",
	};
}
