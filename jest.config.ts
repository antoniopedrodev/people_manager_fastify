export default {
preset: 'ts-jest',
testEnvironment: 'node',
roots: ['<rootDir>/src'],
testMatch: ['**/*.spec.ts', '**/*.test.ts'],
collectCoverage: true,
collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
    '!src/app.ts'
],
coverageDirectory: 'coverage',
coverageReporters: ['text', 'lcov'],
moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
}
};
