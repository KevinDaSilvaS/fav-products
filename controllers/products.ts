import { Ctx } from "../dtos/ctx.ts";
import { IController } from "./IController.ts";

export class ProductsController implements IController {
  constructor() {
  }

  public async getAll(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public async get(ctx: Ctx) {
    console.log(ctx.params);
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public async save(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public async update(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }

  public async delete(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola da camada de produto" } };
  }
}
