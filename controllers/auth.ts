import { Ctx } from "../dtos/ctx.ts";
import { AuthService } from "../services/auth.ts";
import { IController } from "./IController.ts";

export class AuthController implements IController {
  private service: AuthService;
  constructor(cache: Cache) {
    this.service = new AuthService(cache);
  }

  public async getAll(_ctx: Ctx) {
    return { code: 404, data: { error: "Method not implemented" } };
  }

  public async get(ctx: Ctx) {

    return { code: 200, data: { error: "Method not implemented" } };
  }

  public async save(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public async update(_ctx: Ctx) {
    return { code: 404, data: { error: "Method not implemented" } };
  }

  public async delete(_ctx: Ctx) {
    return { code: 200, data: { error: "Method not implemented" } };
  }
}
