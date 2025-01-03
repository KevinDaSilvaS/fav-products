import { connect } from "@db/redis";
import { Application } from "jsr:@oak/oak/application";
import { getRouter } from "./routes/routes.ts";
import { auth } from "./middlewares/auth.ts";

const redis = await connect({
  hostname: "127.0.0.1",
  port: 6379,
});

const cache = redis as unknown as Cache;

const router = getRouter({ cache });
const app = new Application();

const authMiddleware = auth(cache);
app.use(authMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
