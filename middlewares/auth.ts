import { Middleware, Next } from "@oak/oak/middleware";
import { AuthService } from "../services/auth.ts";
import { Context } from "@oak/oak/context";

const bypassPaths: Record<string, Record<string, boolean>> = {
  "/auth": {
    "POST": true
  }
} 

export const auth = (cache: Cache): Middleware => {
  const authService = new AuthService(cache);
  // deno-lint-ignore no-explicit-any
  return async (ctx: Context<Record<string, any>, Record<string, any>>, next: Next) => {
    const path = ctx.request.url.pathname
    const method = ctx.request.method
    if (bypassPaths[path] && bypassPaths[path][method]) {
      return next();
    }

    const authToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const authResult = await authService.isLoggedIn(authToken);
    if (authResult.code == 200) {
      return next();
    }

    ctx.response.headers.append("Content-Type", "application/json");
    ctx.response.status = authResult.code;
    ctx.response.body = authResult.data;
    return;
  };
};