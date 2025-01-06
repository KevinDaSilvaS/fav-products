import { NAMESPACE_DNS, v5 } from "@std/uuid";
import { Collection, Database } from "@db/mongo";
import { clients, ClientSchema } from "../repositories/clients/schema.ts";
import { ApplicationErrors } from "../dtos/errors-enum.ts";

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
    const userId = await this.cache.get(sessionId);
    if (userId) {
      return { code: 200, data: { userId } };
    }

    return { code: 401, data: { error: ApplicationErrors.NOT_LOGGED_IN } };
  }

  public async login(email: string) {
    const user = await this.collection.findOne({ email }, { projection: {} });
    if (!user) {
      return {
        code: 404,
        data: { error: ApplicationErrors.RESOURCE_NOT_FOUND },
      };
    }

    const data = new TextEncoder().encode(
      `${email}${new Date().toISOString()}`,
    );

    const sessionToken = await v5.generate(NAMESPACE_DNS, data);
    const ok = await this.cache.set(sessionToken, user?._id, {
      ex: this.ttlInSeconds,
    });

    if (ok == "OK") {
      return { code: 201, data: { sessionToken } };
    }
    return { code: 500, data: { error: ApplicationErrors.UNABLE_TO_EXECUTE_ACTION } };
  }

  public async logout(sessionId: string) {
    await this.cache.del(sessionId);
    return { code: 204, data: undefined };
  }
}
