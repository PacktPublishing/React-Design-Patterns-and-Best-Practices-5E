import type { Config } from "drizzle-kit";
import { config } from "./src/config";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:12345678@localhost:5432/chapter12",
  },
} satisfies Config;
