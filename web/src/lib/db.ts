import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as Schema from "@/lib/schema";

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error("DATABASE_URL is missing");

const db = drizzle(postgres(DATABASE_URL), {
  schema: Schema,
});

export default db;
