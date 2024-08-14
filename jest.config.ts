/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/semi */
import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/presentation/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}

export default config;