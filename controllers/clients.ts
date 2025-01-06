import { Database } from "@db/mongo";
import { Ctx } from "../dtos/ctx.ts";
import { ClientService } from "../services/clients.ts";
import { IController } from "./IController.ts";
import { ClientBody, UpdateClientBody } from "../dtos/requests/client.ts";
import { AuthService } from "../services/auth.ts";
import { ApplicationErrors } from "../dtos/errors-enum.ts";

export class ClientsController implements IController {
  private service: ClientService;
  private authService: AuthService;

  constructor(cache: Cache, db: Database) {
    this.service = new ClientService(db);
    this.authService = new AuthService(cache, db);
  }

  public async getAll(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const { data: { userId } } = await this.authService.isLoggedIn(
      sessionToken,
    );
    if (!userId) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.getUser(userId);
  }

  public async get(_ctx: Ctx) {
    return { code: 405, data: { error: ApplicationErrors.METHOD_NOT_ALLOWED } };
  }

  public async save(ctx: Ctx) {
    const body: ClientBody = await ctx.request.body.json();
    return await this.service.createUser(body);
  }

  public async update(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const userId = ctx.params.path_id;
    const body: UpdateClientBody = await ctx.request.body.json();
    if (!await this.authService.canAccessResource(sessionToken, userId)) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.updateUser(userId, body.name);
  }

  public async delete(ctx: Ctx) {
    const sessionToken = ctx.request.headers.get("SESSION_TOKEN") ?? "";
    const userId = ctx.params.path_id;
    if (!await this.authService.canAccessResource(sessionToken, userId)) {
      return {
        code: 403,
        data: { error: ApplicationErrors.ACTION_NOT_ALLOWED },
      };
    }
    return await this.service.deleteUser(userId);
  }
}
