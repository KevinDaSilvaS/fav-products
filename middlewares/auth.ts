import { Middleware, Next } from "@oak/oak/middleware";
import { AuthService } from "../services/auth.ts";
import { Context } from "@oak/oak/context";

export const auth = (_dbConn: any, _cache: any): Middleware => {
  const authService = new AuthService();
  return (ctx: Context<Record<string, any>, Record<string, any>>, next: Next) => {
    const authResult = authService.isLoggedIn("1");
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