import { Application } from "jsr:@oak/oak/application";
import { getRouter } from "./routes/routes.ts";

const router = getRouter();
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
