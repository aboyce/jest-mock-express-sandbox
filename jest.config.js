/* eslint-disable @typescript-eslint/no-var-requires */
const tsPreset = require('ts-jest/jest-preset')

const ignorePatterns = [
  '<rootDir>/dist',
  '<rootDir>/src/models',
  '<rootDir>/src/helpers',
  '<rootDir>/src/routers',
  '<rootDir>/src/services',
]

const optionOverrides = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ignorePatterns,
  coveragePathIgnorePatterns: ignorePatterns,
}

module.exports = { ...tsPreset, ...optionOverrides }
