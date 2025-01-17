import { connect } from "@db/redis";
import { Application } from "jsr:@oak/oak/application";
import { getRouter } from "./routes/routes.ts";
import { auth } from "./middlewares/auth.ts";
import { connectDb } from "./repositories/start_db.ts";
import "jsr:@std/dotenv/load";

const db = await connectDb();
const redis = await connect({
  hostname: Deno.env.get("CACHE_HOST") ?? "",
  port: Deno.env.get("CACHE_PORT") ?? 6379,
});

const cache = redis as unknown as Cache;

const router = getRouter({ cache, db });
const app = new Application();

const authMiddleware = auth(cache, db);
app.use(authMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
