import { Router } from "jsr:@oak/oak/router";
import { ClientsController } from "../controllers/clients.ts";
import { ProductsController } from "../controllers/products.ts";
import { AuthController } from "../controllers/auth.ts";

const router = new Router();

const clients = { path: "/clients", controller: ClientsController };
const products = { path: "/:clientId/products", controller: ProductsController };
const auth = { path: "/auth", controller: AuthController };

const routes = [clients, products, auth];

export function getRouter() {
  for (const route of routes) {
    const controller = new route.controller();

    router.get(route.path + "/:path_id", (ctx) => {
      const { code, data } = controller.get(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.get(route.path, (ctx) => {
      const { code, data } = controller.getAll(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.post(route.path, (ctx) => {
      const { code, data } = controller.save(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.patch(route.path, (ctx) => {
      const { code, data } = controller.update(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.delete(route.path, (ctx) => {
      const { code, data } = controller.delete(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });
  }
  return router;
}
