/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json"
    }
  },
  moduleDirectories: ['node_modules', 'src']
};