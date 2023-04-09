export default {
    transform: {},
    testEnvironment: 'node', // specify test environment
    testMatch: [
        '**/__tests__/**/*.test.js', // include test files
        '**/?(*.)+(spec|test).js' // include test files
    ],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['js', 'json'], // specify file extensions
    collectCoverageFrom: ['**/*.{js}', '!**/node_modules/**'], // collect coverage from files
    coverageDirectory: 'coverage' // specify coverage directory
};