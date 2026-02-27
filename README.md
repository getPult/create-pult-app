# create-pult-app

Scaffold a new [Pult](https://pult.rest) project in seconds.

## Usage

```bash
npx create-pult-app
```

Or with a project name:

```bash
npx create-pult-app my-app
```

## What it does

Interactive wizard that lets you:

1. **Pick a framework** — Next.js, Remix, Nuxt, SvelteKit, Astro, Express, Fastify, Hono
2. **Add services** — Database, Auth, Redis, Storage
3. **Configure options** — TypeScript, Tailwind CSS, ESLint, Git

Generates a ready-to-deploy project with:

- `pult.yaml` — deployment configuration
- `.env.example` — environment variables for selected services
- `package.json` — scripts for dev, build, start
- Framework-specific boilerplate

## Deploy

```bash
cd my-app
npm install
pult deploy
```

## License

MIT
