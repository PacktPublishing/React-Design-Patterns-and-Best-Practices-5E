#!/usr/bin/env node
import { execSync } from "node:child_process";

const prefix = "@monorepo/"; // change if your scope differs
const targets = process.argv.slice(2); // e.g. ["utils", "ui", "frontend"]

if (targets.length === 0) {
  console.error("Usage: npm run build -- <workspace> [<workspace>...]");
  process.exit(1);
}

for (const name of targets) {
  const ws = name.includes("/") ? name : `${prefix}${name}`;
  console.log(`\n⬢ Building ${ws} ...\n`);
  execSync(`npm run -w ${ws} build`, { stdio: "inherit" });
}
