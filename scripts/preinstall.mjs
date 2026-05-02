import { unlinkSync, existsSync } from "fs";

["package-lock.json", "yarn.lock"].forEach((f) => {
  if (existsSync(f)) unlinkSync(f);
});

const agent = process.env.npm_config_user_agent ?? "";
if (!agent.startsWith("pnpm/")) {
  console.error("Use pnpm instead of npm or yarn.");
  process.exit(1);
}
