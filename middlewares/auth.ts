import { Middleware } from "@oak/oak/middleware";

export const auth: Middleware = (ctx, next) => {
  console.log(`Received ${ctx.request.url} at ${new Date()}`);
  next();
};
