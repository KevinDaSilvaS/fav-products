import { NAMESPACE_DNS, v5 } from "@std/uuid";
import { Collection, Database } from "@db/mongo";
import { clients, ClientSchema } from "../repositories/clients/schema.ts";
import { ApplicationErrors } from "../dtos/errors-enum.ts";
import { Codes } from "../dtos/http-enum.ts";

export class AuthService {
  private ttlInSeconds = 3600;
  private cache: Cache;
  private collection: Collection<ClientSchema>;

  constructor(cache: Cache, db: Database) {
    this.cache = cache;
    this.collection = clients(db);
  }

  public async canAccessResource(
    sessionToken: string,
    userId: string,
  ): Promise<boolean> {
    const { data } = await this.isLoggedIn(sessionToken);
    return userId == data.userId;
  }

  public async isLoggedIn(sessionId: string) {
    //@ts-ignore error intellisense redis lib
    const userId = await this.cache.get(sessionId);
    if (userId) {
      return { code: Codes.OK, data: { userId } };
    }

    return {
      code: Codes.NOT_AUTHORIZED,
      data: { error: ApplicationErrors.NOT_LOGGED_IN },
    };
  }

  public async login(email: string) {
    const user = await this.collection.findOne({ email }, { projection: {} });
    if (!user) {
      return {
        code: Codes.NOT_FOUND,
        data: { error: ApplicationErrors.RESOURCE_NOT_FOUND },
      };
    }

    const data = new TextEncoder().encode(
      `${email}${new Date().toISOString()}`,
    );

    const sessionToken = await v5.generate(NAMESPACE_DNS, data);
    //@ts-ignore error intellisense redis lib
    const ok = await this.cache.set(sessionToken, user?._id, {
      ex: this.ttlInSeconds,
    });

    if (ok == "OK") {
      return { code: Codes.CREATED, data: { sessionToken } };
    }
    return {
      code: Codes.INTERNAL_SERVER_ERROR,
      data: { error: ApplicationErrors.UNABLE_TO_EXECUTE_ACTION },
    };
  }

  public async logout(sessionId: string) {
    //@ts-ignore error intellisense redis lib
    await this.cache.del(sessionId);
    return { code: Codes.NO_CONTENT, data: undefined };
  }
}
