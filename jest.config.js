module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|jpg|png|scss)$": "<rootDir>/empty-module.js"
  }
}