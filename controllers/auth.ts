import { Ctx } from "../dtos/ctx.ts";
import { IController } from "./IController.ts";

export class AuthController implements IController {
  dbConn: string;
  cache: string;
  constructor() {
    this.dbConn = "";
    this.cache = "";
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
