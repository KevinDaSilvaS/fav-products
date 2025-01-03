import { Middleware, Next } from "@oak/oak/middleware";
import { AuthService } from "../services/auth.ts";
import { Context } from "@oak/oak/context";

export const auth = (cache: Cache): Middleware => {
  const authService = new AuthService(cache);
  return async (ctx: Context<Record<string, any>, Record<string, any>>, next: Next) => {
    const authResult = await authService.isLoggedIn("1");
    console.log(authResult)
    if (authResult.code == 204) {
      return next();
    }

    ctx.response.headers.append("Content-Type", "application/json");
    ctx.response.status = authResult.code;
    ctx.response.body = authResult.data;
    return;
  };
};