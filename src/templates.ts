export interface FrameworkTemplate {
  id: string
  name: string
  color: string
  devCommand: string
  buildCommand: string
  startCommand: string
  port: number
}

export interface ServiceModule {
  id: string
  name: string
  description: string
  envVars: Record<string, string>
}

export const FRAMEWORKS: FrameworkTemplate[] = [
  {
    id: "nextjs",
    name: "Next.js",
    color: "#000000",
    devCommand: "next dev",
    buildCommand: "next build",
    startCommand: "next start",
    port: 3000,
  },
  {
    id: "remix",
    name: "Remix",
    color: "#121212",
    devCommand: "remix vite:dev",
    buildCommand: "remix vite:build",
    startCommand: "remix-serve ./build/server/index.js",
    port: 3000,
  },
  {
    id: "nuxt",
    name: "Nuxt",
    color: "#00DC82",
    devCommand: "nuxt dev",
    buildCommand: "nuxt build",
    startCommand: "node .output/server/index.mjs",
    port: 3000,
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    color: "#FF3E00",
    devCommand: "vite dev",
    buildCommand: "vite build",
    startCommand: "node build",
    port: 5173,
  },
  {
    id: "astro",
    name: "Astro",
    color: "#BC52EE",
    devCommand: "astro dev",
    buildCommand: "astro build",
    startCommand: "astro preview",
    port: 4321,
  },
  {
    id: "express",
    name: "Express",
    color: "#000000",
    devCommand: "tsx watch src/index.ts",
    buildCommand: "tsc",
    startCommand: "node dist/index.js",
    port: 3000,
  },
  {
    id: "fastify",
    name: "Fastify",
    color: "#000000",
    devCommand: "tsx watch src/index.ts",
    buildCommand: "tsc",
    startCommand: "node dist/index.js",
    port: 3000,
  },
  {
    id: "hono",
    name: "Hono",
    color: "#FF5B11",
    devCommand: "tsx watch src/index.ts",
    buildCommand: "tsc",
    startCommand: "node dist/index.js",
    port: 3000,
  },
]

export const SERVICES: ServiceModule[] = [
  {
    id: "db",
    name: "Database",
    description: "PostgreSQL with Pult managed database",
    envVars: {
      DATABASE_URL: "postgresql://localhost:5432/pult",
    },
  },
  {
    id: "auth",
    name: "Auth",
    description: "Authentication with Pult Auth (GoTrue)",
    envVars: {
      PULT_AUTH_URL: "https://auth-APP.pult.rest",
    },
  },
  {
    id: "redis",
    name: "Redis",
    description: "Redis/Valkey cache and pub/sub",
    envVars: {
      REDIS_URL: "redis://localhost:6379",
    },
  },
  {
    id: "storage",
    name: "Storage",
    description: "File storage with Pult Storage (S3-compatible)",
    envVars: {
      PULT_STORAGE_URL: "https://storage-APP.pult.rest",
    },
  },
]

export function getFramework(id: string): FrameworkTemplate | undefined {
  return FRAMEWORKS.find((f) => f.id === id)
}
