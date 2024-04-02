// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest/presets/default-esm",
//   testEnvironment: "node",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svelte"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//     "^.+\\.svelte$": "svelte-jester",
//   },
//   testMatch: ["**/*.test.(ts|tsx|js|jsx)"],
//   extensionsToTreatAsEsm: [".svelte"],
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
// };

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: "ts-jest/presets/default-esm",
//   testEnvironment: "node",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svelte"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//     "^.+\\.svelte$": "svelte-jester",
//   },
//   testMatch: ["**/*.test.(ts|tsx|js|jsx)"],
//   extensionsToTreatAsEsm: [".svelte"],
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
// };

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "svelte"],
  transform: {
    "^.+\\.svelte$": "svelte-jester",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts|tsx|js|jsx)"],
  extensionsToTreatAsEsm: [".svelte"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
};
