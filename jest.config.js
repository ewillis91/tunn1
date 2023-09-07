/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    '/node_modules/(?!(@react-native|react-native)/).*/'
  ]
};