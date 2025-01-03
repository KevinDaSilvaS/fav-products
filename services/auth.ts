export class AuthService {
  private cache: Cache;
  constructor(cache: Cache) {
    this.cache = cache
  }

  public async isLoggedIn(sessionId: string) {
    const ok = await this.cache.set("1", true, { ex: 30 });
    console.log(ok)
    const v = await this.cache.get(sessionId)
    console.log(v)
    if (v) {
      return { code: 204, data: {} };
    }

    return { code: 400, data: { error: "User not logged in" } };
  }

  public login(_email: string) {
    this.cache["12345"] = true;
    return { code: 201, data: { sessionId: "12345" } };
  }

  public logout(sessionId: string) {
    delete this.cache[sessionId];
    return { code: 204, data: {} };
  }
}
