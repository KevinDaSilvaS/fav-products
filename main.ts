import { Application } from "jsr:@oak/oak/application";
import { getRouter } from "./routes/routes.ts";
import { auth } from "./middlewares/auth.ts"

const router = getRouter();
const app = new Application();

const authMiddleware = auth({}, {})
app.use(authMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
