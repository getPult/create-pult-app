import { join, resolve } from "node:path"
import * as p from "@clack/prompts"
import pc from "picocolors"
import type { ProjectConfig } from "./config.js"
import { generatePultYaml, generateEnvExample } from "./config.js"
import { createDirectory, writeFile, initGit, isGitInstalled } from "./utils.js"

export async function scaffold(config: ProjectConfig): Promise<void> {
  const targetDir = resolve(process.cwd(), config.name)

  const spinner = p.spinner()
  spinner.start("Creating project...")

  try {
    createDirectory(targetDir)
  } catch (err) {
    spinner.stop("Failed")
    p.log.error(
      err instanceof Error ? err.message : "Failed to create directory",
    )
    process.exit(1)
  }

  writeFile(targetDir, "pult.yaml", generatePultYaml(config))

  const envContent = generateEnvExample(config)
  if (envContent) {
    writeFile(targetDir, ".env.example", envContent)
    writeFile(targetDir, ".env", envContent)
  }

  writeFile(targetDir, ".gitignore", generateGitignore())

  writeFile(
    targetDir,
    "package.json",
    generatePackageJson(config),
  )

  if (config.typescript) {
    writeFile(targetDir, "tsconfig.json", generateTsconfig())
  }

  writeFile(
    targetDir,
    "README.md",
    generateReadme(config),
  )

  spinner.stop("Project created")

  if (config.git && isGitInstalled()) {
    const gitSpinner = p.spinner()
    gitSpinner.start("Initializing git...")
    const success = initGit(targetDir)
    gitSpinner.stop(success ? "Git initialized" : "Git init failed (non-fatal)")
  }

  p.log.success(pc.green("Done!"))
  p.note(
    [
      `cd ${config.name}`,
      "npm install",
      `npm run dev`,
    ].join("\n"),
    "Next steps",
  )

  p.outro(pc.dim("Deploy with: pult deploy"))
}

function generateGitignore(): string {
  return [
    "node_modules/",
    "dist/",
    ".next/",
    ".nuxt/",
    ".output/",
    ".svelte-kit/",
    "build/",
    ".env",
    ".env.local",
    ".DS_Store",
    "*.tgz",
    "",
  ].join("\n")
}

function generatePackageJson(config: ProjectConfig): string {
  const pkg: Record<string, unknown> = {
    name: config.name,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: config.framework.devCommand,
      build: config.framework.buildCommand,
      start: config.framework.startCommand,
    },
  }

  return JSON.stringify(pkg, null, 2) + "\n"
}

function generateTsconfig(): string {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      outDir: "dist",
      rootDir: "src",
    },
    include: ["src"],
    exclude: ["node_modules", "dist"],
  }

  return JSON.stringify(tsconfig, null, 2) + "\n"
}

function generateReadme(config: ProjectConfig): string {
  const lines = [
    `# ${config.name}`,
    "",
    `Built with [${config.framework.name}](https://pult.rest) and deployed on Pult.`,
    "",
    "## Getting Started",
    "",
    "```bash",
    "npm install",
    "npm run dev",
    "```",
    "",
    "## Deploy",
    "",
    "```bash",
    "pult deploy",
    "```",
    "",
  ]

  if (config.services.length > 0) {
    lines.push("## Services", "")
    for (const service of config.services) {
      lines.push(`- **${service.name}** — ${service.description}`)
    }
    lines.push("")
  }

  return lines.join("\n")
}
