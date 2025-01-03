import { Router } from "jsr:@oak/oak/router";
import { ClientsController } from "../controllers/clients.ts";
import { ProductsController } from "../controllers/products.ts";
import { AuthController } from "../controllers/auth.ts";
import { RouterParams } from "../dtos/routerParams.ts";

const router = new Router();

const clients = { path: "/clients", controller: ClientsController };
const products = { path: "/:clientId/products", controller: ProductsController };
const auth = { path: "/auth", controller: AuthController };

const routes = [clients, products, auth];

export function getRouter(params: RouterParams) {
  for (const route of routes) {
    const controller = new route.controller(params.cache);

    router.get(route.path + "/:path_id", async (ctx) => {
      const { code, data } = await controller.get(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.get(route.path, async (ctx) => {
      const { code, data } = await controller.getAll(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.post(route.path, async (ctx) => {
      const { code, data } = await controller.save(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.patch(route.path, async (ctx) => {
      const { code, data } = await controller.update(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });

    router.delete(route.path, async (ctx) => {
      const { code, data } = await controller.delete(ctx);
      ctx.response.headers.append("Content-Type", "application/json");
      ctx.response.status = code;
      ctx.response.body = data;
    });
  }
  return router;
}
