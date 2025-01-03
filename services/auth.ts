import { v5, NAMESPACE_DNS } from "@std/uuid";

export class AuthService {
  private ttlInSeconds = 3600;
  private cache: Cache;
  constructor(cache: Cache) {
    this.cache = cache
  }

  public async isLoggedIn(sessionId: string) {
    const userId = await this.cache.get(sessionId)
    if (userId) {
      return { code: 200, data: { userId } };
    }

    return { code: 401, data: { error: "User not logged in" } };
  }

  public async login(email: string) {
    const data = new TextEncoder().encode(`${email}${new Date().toISOString()}`);
    const sessionToken = await v5.generate(NAMESPACE_DNS, data);
    const ok = await this.cache.set(sessionToken, "userid", { ex: this.ttlInSeconds });
    if (ok == "OK") {
      return { code: 201, data: { sessionToken } };
    }
    return { code: 500, data: { error: "Unable to login" } };
  }

  public async logout(sessionId: string) {
    await this.cache.del(sessionId)
    return { code: 204, data: undefined };
  }
}
