import { Ctx } from "../dtos/ctx.ts";
import { IController } from "./IController.ts";

export class ClientsController implements IController {
  dbConn: string;
  cache: string;
  constructor() {
    this.dbConn = "";
    this.cache = "";
  }

  public getAll(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }

  public get(ctx: Ctx) {
    console.log(ctx.params);
    return { code: 200, data: { oi: "ola" } };
  }

  public save(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }

  public update(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }

  public delete(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }
}
