import { Database } from "@db/mongo";
import { Ctx } from "../dtos/ctx.ts";
import { AuthBody } from "../dtos/requests/auth.ts";
import { AuthService } from "../services/auth.ts";
import { IController } from "./IController.ts";

export class AuthController implements IController {
  private service: AuthService;
  
  constructor(cache: Cache, db: Database) {
    this.service = new AuthService(cache, db);
  }

  public async get(_ctx: Ctx) {
    return { code: 405, data: { error: "Method not allowed" } };
  }

  public async getAll(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    return await this.service.isLoggedIn(sessionToken);
  }

  public async save(ctx: Ctx) {
    const body: AuthBody = await ctx.request.body.json()
    return await this.service.login(body.email)
  }

  public async update(_ctx: Ctx) {
    return { code: 405, data: { error: "Method not allowed" } };
  }

  public async delete(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    return await this.service.logout(sessionToken);
  }
}
