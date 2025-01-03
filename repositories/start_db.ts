import { Database, MongoClient } from "jsr:@db/mongo";
import "jsr:@std/dotenv/load";

export async function connectDb(): Promise<Database> {
  const user = Deno.env.get("DB_USER");
  const password = Deno.env.get("DB_PASS");
  const host = Deno.env.get("DB_HOST");
  const port = Deno.env.get("DB_PORT");
  const dbName = Deno.env.get("DB_NAME");
  const client = new MongoClient();
  await client.connect(`mongodb://${user}:${password}@${host}:${port}/`);
  return client.database(dbName);
}