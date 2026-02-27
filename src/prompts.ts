import * as p from "@clack/prompts"
import pc from "picocolors"
import { FRAMEWORKS, SERVICES } from "./templates.js"
import type { ProjectConfig } from "./config.js"
import { validateProjectName } from "./utils.js"

export async function runPrompts(defaultName?: string): Promise<ProjectConfig | null> {
  p.intro(pc.bgCyan(pc.black(" create-pult-app ")))

  const project = await p.group(
    {
      name: () =>
        p.text({
          message: "Project name",
          placeholder: defaultName ?? "my-pult-app",
          initialValue: defaultName,
          validate: (value) => validateProjectName(value),
        }),
      framework: () =>
        p.select({
          message: "Framework",
          options: FRAMEWORKS.map((f) => ({
            value: f.id,
            label: f.name,
          })),
        }),
      services: () =>
        p.multiselect({
          message: "Services (space to toggle)",
          options: SERVICES.map((s) => ({
            value: s.id,
            label: s.name,
            hint: s.description,
          })),
          required: false,
        }),
      typescript: () =>
        p.confirm({
          message: "TypeScript?",
          initialValue: true,
        }),
      tailwind: () =>
        p.confirm({
          message: "Tailwind CSS?",
          initialValue: true,
        }),
      eslint: () =>
        p.confirm({
          message: "ESLint?",
          initialValue: true,
        }),
      git: () =>
        p.confirm({
          message: "Initialize git repository?",
          initialValue: true,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.")
        process.exit(0)
      },
    },
  )

  const framework = FRAMEWORKS.find((f) => f.id === project.framework)
  if (!framework) return null

  const selectedServices = SERVICES.filter((s) =>
    (project.services as string[]).includes(s.id),
  )

  return {
    name: project.name,
    framework,
    services: selectedServices,
    typescript: project.typescript,
    tailwind: project.tailwind,
    eslint: project.eslint,
    git: project.git,
  }
}
