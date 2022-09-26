/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	coveragePathIgnorePatterns: [
		"<rootDir>/src/utils", 
		"<rootDir>/src/database.ts", 
		"<rootDir>/src/repositories", 
		"<rootDir>/tests/factories"
	]
};
