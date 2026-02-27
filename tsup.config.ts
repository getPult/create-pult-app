import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  clean: true,
  sourcemap: false,
  minify: false,
  target: "node18",
  splitting: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
})
