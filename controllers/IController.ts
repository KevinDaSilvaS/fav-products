import { ResponseData } from "../dtos/response.ts";
import { Ctx } from "../dtos/ctx.ts";

export interface IController {
    get: (ctx: Ctx) => ResponseData
    getAll: (ctx: Ctx) => ResponseData
    save: (ctx: Ctx) => ResponseData
    update: (ctx: Ctx) => ResponseData
    delete: (ctx: Ctx) => ResponseData
}