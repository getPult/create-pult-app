import { runPrompts } from "./prompts.js"
import { scaffold } from "./scaffold.js"

const args = process.argv.slice(2)
const projectName = args.find((arg) => !arg.startsWith("-"))

const config = await runPrompts(projectName)

if (config) {
  await scaffold(config)
}
