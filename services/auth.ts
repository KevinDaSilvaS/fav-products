export class AuthService {
  private cacheConn: Record<string, boolean> = {
    "1": true,
  };
  private dbConn = {};
  constructor() {
  }

  public isLoggedIn(sessionId: string) {
    if (this.cacheConn[sessionId]) {
      return { code: 204, data: {} };
    }

    return { code: 400, data: { error: "User not logged in" } };
  }

  public login(_email: string) {
    this.cacheConn["12345"] = true;
    return { code: 201, data: { sessionId: "12345" } };
  }

  public logout(sessionId: string) {
    delete this.cacheConn[sessionId];
    return { code: 204, data: {} };
  }
}
