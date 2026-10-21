// Apply db/schema.sql (and db/seed.sql with --seed) to DATABASE_URL.
// Usage: npm run migrate [-- --seed]
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const here = dirname(fileURLToPath(import.meta.url));

async function apply(file) {
  const text = readFileSync(join(here, "..", "db", file), "utf8");
  const statements = text
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    await sql.query(stmt);
    console.log(`[${file}] ok:`, stmt.split("\n")[0].slice(0, 68));
  }
}

await apply("schema.sql");
if (process.argv.includes("--seed")) await apply("seed.sql");
console.log("\nMigration complete.");
