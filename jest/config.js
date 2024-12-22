module.exports = {
  testEnvironment: 'jest-environment-node',
  rootDir: '../',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: './jest/babel.config.js' }],
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/\\.pnp\\.[^\\/]+$',
  ],
  // moduleNameMapper: {
  //   '^@utils(.*)$': '<rootDir>/src/utils$1',
  //   '^@components(.*)$': '<rootDir>/src/components$1',
  //   '^@reducers(.*)$': '<rootDir>/src/reducers$1',
  //   '^@actions(.*)$': '<rootDir>/src/actions$1',
  //   '^.+\\.(css|pcss)$': '<rootDir>/jest/no-op.js',
  // },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/test-utils/**/*.js',
  ],
  coverageDirectory: '<rootDir>/jest/coverage',
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
}
