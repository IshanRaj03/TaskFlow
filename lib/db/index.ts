import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { categories, tasks, projects, users } from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (error) => {
  console.error("Unexpected error on idle client", error);
  process.exit(-1);
});

export const db = drizzle(pool, {
  schema: {
    users,
    projects,
    tasks,
    categories,
  },
});
