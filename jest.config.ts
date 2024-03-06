import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src", "pkg"],
  roots: ["<rootDir>/src/", "<rootDir>/tests/", "<rootDir>/pkg/"],
}

export default config
