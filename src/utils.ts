import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { execSync } from "node:child_process"

export function validateProjectName(name: string): string | undefined {
  if (!name) return "Project name is required"
  if (!/^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i.test(name)) {
    return "Project name must start and end with alphanumeric characters"
  }
  if (name.length > 214) return "Project name is too long"
  return undefined
}

export function createDirectory(path: string): void {
  if (existsSync(path)) {
    throw new Error(`Directory "${path}" already exists`)
  }
  mkdirSync(path, { recursive: true })
}

export function writeFile(dir: string, filePath: string, content: string): void {
  const fullPath = join(dir, filePath)
  const parentDir = join(fullPath, "..")
  if (!existsSync(parentDir)) {
    mkdirSync(parentDir, { recursive: true })
  }
  writeFileSync(fullPath, content, "utf-8")
}

export function initGit(dir: string): boolean {
  try {
    execSync("git init", { cwd: dir, stdio: "ignore" })
    execSync("git add -A", { cwd: dir, stdio: "ignore" })
    execSync('git commit -m "Initial commit from create-pult-app"', {
      cwd: dir,
      stdio: "ignore",
    })
    return true
  } catch {
    return false
  }
}

export function isGitInstalled(): boolean {
  try {
    execSync("git --version", { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}
