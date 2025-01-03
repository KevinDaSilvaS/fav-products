import { ResponseData } from "../dtos/response.ts";
import { Ctx } from "../dtos/ctx.ts";

export interface IController {
    get: (ctx: Ctx) => Promise<ResponseData>
    getAll: (ctx: Ctx) => Promise<ResponseData>
    save: (ctx: Ctx) => Promise<ResponseData>
    update: (ctx: Ctx) => Promise<ResponseData>
    delete: (ctx: Ctx) => Promise<ResponseData>
}