import api from "../apiConfig";
import { AuthResponse, LoginDTO, SignupDTO } from "@/types/auth";

class AuthService {
  login(credentials: LoginDTO) {
    return api.post<AuthResponse>("/auth/login", credentials);
  }

  signup(credentials: SignupDTO) {
    return api.post<AuthResponse>("/auth/signup", credentials);
  }
}

export default new AuthService();
