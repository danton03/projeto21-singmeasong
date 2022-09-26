import { faker } from "@faker-js/faker";

export interface INewRecommendation {
  name: string,
  youtubeLink: string
}

export interface IRecommendation {
	id: number,
  name: string,
  youtubeLink: string
	score: number
}



export function createRecommendation(): INewRecommendation {
	return {
		name: faker.lorem.words(2),
		youtubeLink: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
	};
}

export function getRecommendation(): IRecommendation {
	return {
		id: 1,
		name: faker.lorem.words(2),
		youtubeLink: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
		score: 0
	};
}

export function recommendationToDelete(): IRecommendation {
	return {
		id: 1,
		name: faker.lorem.words(2),
		youtubeLink: `https://www.youtube.com/watch?v=${faker.lorem.word(11)}`,
		score: -6
	};
}

export function invalidRecommendation() {
	return {
		name: "",
		youtubeLink: "https://www.google.com/",
	};
}

export function getSixRecommendations() {
	const recommendations = [
		{
			id: 1,
			name: "recommendation 1",
			youtubeLink: "https://www.youtube.com/watch?v=KstyudD7NiU",
			score: -2,
		},
		{
			id: 2,
			name: "recommendation 2",
			youtubeLink: "https://www.youtube.com/watch?v=KstyudD7NiU",
			score: 9,
		},
		{
			id: 3,
			name: "recommendation 3",
			youtubeLink: "https://www.youtube.com/watch?v=KstyudD7NiU",
			score: 27,
		},
		{
			id: 4,
			name: "recommendation 4",
			youtubeLink: "https://www.youtube.com/watch?v=KstyudD7NiU",
			score: 4,
		},
		{
			id: 5,
			name: "recommendation 5",
			youtubeLink: "https://www.youtube.com/watch?v=KstyudD7NiU",
			score: 85,
		},
	];
	return recommendations;
}