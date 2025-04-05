import api from "../apiConfig";
import { AuthResponse, LoginDTO, SignupDTO } from "@/types/auth";

class AuthService {
  /**
   * Authenticates a user and returns JWT token
   * @throws {AxiosError} 401 for invalid credentials
   */
  login(credentials: LoginDTO) {
    return api.post<AuthResponse>("/auth/login", credentials);
  }

  /**
   * Registers new user and returns token automatically
   * @throws {AxiosError} 409 for email already registered
   */
  signup(credentials: SignupDTO) {
    return api.post<AuthResponse>("/auth/signup", credentials);
  }
}

export default new AuthService();
