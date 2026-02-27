import { describe, it, expect } from "vitest"
import { FRAMEWORKS, SERVICES, getFramework } from "../src/templates.js"

describe("FRAMEWORKS", () => {
  it("has unique ids", () => {
    const ids = FRAMEWORKS.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("has required fields for each framework", () => {
    for (const fw of FRAMEWORKS) {
      expect(fw.id).toBeTruthy()
      expect(fw.name).toBeTruthy()
      expect(fw.devCommand).toBeTruthy()
      expect(fw.buildCommand).toBeTruthy()
      expect(fw.startCommand).toBeTruthy()
      expect(fw.port).toBeGreaterThan(0)
    }
  })
})

describe("SERVICES", () => {
  it("has unique ids", () => {
    const ids = SERVICES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("has env vars for each service", () => {
    for (const svc of SERVICES) {
      expect(Object.keys(svc.envVars).length).toBeGreaterThan(0)
    }
  })
})

describe("getFramework", () => {
  it("returns framework by id", () => {
    expect(getFramework("nextjs")?.name).toBe("Next.js")
  })

  it("returns undefined for unknown id", () => {
    expect(getFramework("unknown")).toBeUndefined()
  })
})
