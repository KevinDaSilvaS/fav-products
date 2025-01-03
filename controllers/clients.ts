import { Ctx } from "../dtos/ctx.ts";
import { IController } from "./IController.ts";

export class ClientsController implements IController {
  constructor() {
  }

  public async getAll(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }

  public async get(ctx: Ctx) {
    console.log(ctx.params);
    return { code: 200, data: { oi: "ola" } };
  }

  public async save(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }

  public async update(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }

  public async delete(_ctx: Ctx) {
    return { code: 200, data: { oi: "ola" } };
  }
}
