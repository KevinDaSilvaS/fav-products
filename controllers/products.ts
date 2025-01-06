import { Database } from "@db/mongo";
import { Ctx } from "../dtos/ctx.ts";
import { AuthService } from "../services/auth.ts";
import { ProductService } from "../services/products.ts";
import { IController } from "./IController.ts";
import { ApplicationErrors } from "../dtos/errors-enum.ts";

export class ProductsController implements IController {
  private service: ProductService;
  private authService: AuthService;
  private MAX_LIMIT = 100;
  private MIN_PAGE = 1;

  constructor(cache: Cache, db: Database) {
    this.service = new ProductService(db);
    this.authService = new AuthService(cache, db);
  }

  public async getAll(ctx: Ctx) {
    const url = ctx.request.url;
    let page = parseInt(url.searchParams.get("page") ?? "1");
    let limit = parseInt(url.searchParams.get("limit") ?? "10");
    page = page < this.MIN_PAGE ? this.MIN_PAGE : page;
    limit = limit > this.MAX_LIMIT || limit < 1 ? this.MAX_LIMIT : limit;

    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const userId = ctx.params.client_id;
    if (!await this.authService.canAccessResource(sessionToken, userId)) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.getProducts(userId, page, limit);
  }

  public async get(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const userId = ctx.params.client_id;
    const productId = ctx.params.path_id;
    if (!await this.authService.canAccessResource(sessionToken, userId)) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.getProduct(userId, productId);
  }

  public async update(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const userId = ctx.params.client_id;
    const productId = ctx.params.path_id;
    if (!await this.authService.canAccessResource(sessionToken, userId)) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.addProduct(userId, productId);
  }

  public async save(_ctx: Ctx) {
    return { code: 405, data: { error: ApplicationErrors.METHOD_NOT_ALLOWED } };
  }

  public async delete(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const userId = ctx.params.client_id;
    const productId = ctx.params.path_id;
    if (!await this.authService.canAccessResource(sessionToken, userId)) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.deleteProduct(productId);
  }
}
