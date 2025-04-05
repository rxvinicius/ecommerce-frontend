import api from "../apiConfig";

class AuthService {
  private api;

  constructor() {
    this.api = api;
  }

  login(credentials: { email: string; password: string }) {
    return this.api.post("/auth/login", credentials);
  }

  signup(credentials: { email: string; name: string; password: string }) {
    return this.api.post("/auth/signup", credentials);
  }
}

export default new AuthService();
