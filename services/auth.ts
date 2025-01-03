import { NAMESPACE_DNS, v5 } from "@std/uuid";
import { Collection, Database } from "@db/mongo";
import { clients, ClientSchema } from "../repositories/clients/schema.ts";

export class AuthService {
  private ttlInSeconds = 3600;
  private cache: Cache;
  private collection: Collection<ClientSchema>;

  constructor(cache: Cache, db: Database) {
    this.cache = cache;
    this.collection = clients(db);
  }

  public async isLoggedIn(sessionId: string) {
    const userId = await this.cache.get(sessionId);
    if (userId) {
      return { code: 200, data: { userId } };
    }

    return { code: 401, data: { error: "User not logged in" } };
  }

  public async login(email: string) {
    const user = await this.collection.findOne({ email }, { projection: {} });
    if (!user) {
      return { code: 404, data: { error: "User not found" } };
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
    return { code: 500, data: { error: "Unable to login" } };
  }

  public async logout(sessionId: string) {
    await this.cache.del(sessionId);
    return { code: 204, data: undefined };
  }
}
