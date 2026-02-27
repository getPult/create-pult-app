import { describe, it, expect } from "vitest"
import { validateProjectName } from "../src/utils.js"

describe("validateProjectName", () => {
  it("accepts valid names", () => {
    expect(validateProjectName("my-app")).toBeUndefined()
    expect(validateProjectName("my-pult-app")).toBeUndefined()
    expect(validateProjectName("app123")).toBeUndefined()
    expect(validateProjectName("a")).toBeUndefined()
  })

  it("rejects empty names", () => {
    expect(validateProjectName("")).toBeDefined()
  })

  it("rejects names starting with special chars", () => {
    expect(validateProjectName("-my-app")).toBeDefined()
    expect(validateProjectName(".my-app")).toBeDefined()
  })

  it("rejects names ending with special chars", () => {
    expect(validateProjectName("my-app-")).toBeDefined()
    expect(validateProjectName("my-app.")).toBeDefined()
  })
})
