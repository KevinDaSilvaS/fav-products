import { Ctx } from "../dtos/ctx.ts";
import { AuthService } from "../services/auth.ts";
import { IController } from "./IController.ts";

export class AuthController implements IController {
  private service: AuthService;
  constructor(cache: Cache) {
    this.service = new AuthService(cache);
  }

  public getAll(_ctx: Ctx) {
    return { code: 404, data: { error: "Method not implemented" } };
  }

  public get(_ctx: Ctx) {
    return { code: 200, data: { error: "Method not implemented" } };
  }

  public save(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public update(_ctx: Ctx) {
    return { code: 404, data: { error: "Method not implemented" } };
  }

  public delete(_ctx: Ctx) {
    return { code: 200, data: { error: "Method not implemented" } };
  }
}
