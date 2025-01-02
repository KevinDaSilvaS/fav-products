import { Ctx } from "../dtos/ctx.ts";
import { IController } from "./IController.ts";

export class ProductsController implements IController {
  dbConn: string;
  constructor() {
    this.dbConn = "";
  }

  public getAll(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public get(ctx: Ctx) {
    console.log(ctx.request.url, ctx.params);
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public save(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public update(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public delete(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }
}
