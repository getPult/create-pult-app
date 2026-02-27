import { describe, it, expect } from "vitest"
import { generatePultYaml, generateEnvExample } from "../src/config.js"
import { FRAMEWORKS, SERVICES } from "../src/templates.js"
import type { ProjectConfig } from "../src/config.js"

function makeConfig(overrides?: Partial<ProjectConfig>): ProjectConfig {
  return {
    name: "test-app",
    framework: FRAMEWORKS[0]!,
    services: [],
    typescript: true,
    tailwind: true,
    eslint: true,
    git: true,
    ...overrides,
  }
}

describe("generatePultYaml", () => {
  it("generates basic config without services", () => {
    const yaml = generatePultYaml(makeConfig())
    expect(yaml).toContain("name: test-app")
    expect(yaml).toContain("command: next build")
    expect(yaml).toContain("port: 3000")
    expect(yaml).not.toContain("services:")
  })

  it("includes services when selected", () => {
    const yaml = generatePultYaml(makeConfig({ services: [SERVICES[0]!] }))
    expect(yaml).toContain("services:")
    expect(yaml).toContain("  - db")
  })
})

describe("generateEnvExample", () => {
  it("returns empty string with no services", () => {
    expect(generateEnvExample(makeConfig())).toBe("")
  })

  it("generates env vars for services", () => {
    const env = generateEnvExample(makeConfig({ services: [SERVICES[0]!] }))
    expect(env).toContain("DATABASE_URL=")
  })
})
