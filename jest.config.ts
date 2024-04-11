module.exports = {
    verbose: true,
    collectCoverage: true,
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
    },
    preset: 'ts-jest',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}