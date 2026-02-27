import type { FrameworkTemplate, ServiceModule } from "./templates.js"

export interface ProjectConfig {
  name: string
  framework: FrameworkTemplate
  services: ServiceModule[]
  typescript: boolean
  tailwind: boolean
  eslint: boolean
  git: boolean
}

export function generatePultYaml(config: ProjectConfig): string {
  const lines: string[] = [
    `name: ${config.name}`,
    "",
    "build:",
    `  command: ${config.framework.buildCommand}`,
    "",
    "run:",
    `  command: ${config.framework.startCommand}`,
    `  port: ${config.framework.port}`,
  ]

  if (config.services.length > 0) {
    lines.push("", "services:")
    for (const service of config.services) {
      lines.push(`  - ${service.id}`)
    }
  }

  lines.push("")
  return lines.join("\n")
}

export function generateEnvExample(config: ProjectConfig): string {
  const lines: string[] = []

  for (const service of config.services) {
    for (const [key, value] of Object.entries(service.envVars)) {
      lines.push(`${key}=${value}`)
    }
  }

  if (lines.length === 0) return ""

  lines.push("")
  return lines.join("\n")
}
