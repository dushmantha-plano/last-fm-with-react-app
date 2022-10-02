module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/*.ts',
    '!src/*.tsx',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    '^@Components(.*)': '<rootDir>/src/components/$1',
    '^@Config(.*)': '<rootDir>/src/config/$1',
    '^@Store(.*)': '<rootDir>/src/store/$1',
    '^@Utils(.*)': '<rootDir>/src/utils/$1',
    '^@Views(.*)': '<rootDir>/src/views/$1',
    '^@Assets(.*)': '<rootDir>/assets/$1',
    '^@Constants(.*)': '<rootDir>/src/constants/$1',
  },
  coveragePathIgnorePatterns: ['./src/*/*.types.{ts,tsx}'],
  coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      lines: 95,
      functions: 95,
    },
  },
};