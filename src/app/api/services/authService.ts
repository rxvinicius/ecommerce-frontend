import api from "../apiConfig";
import { LoginDTO, SignupDTO } from "@/types/auth";

type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

class AuthService {
  login(credentials: LoginDTO) {
    return api.post<AuthResponse>("/auth/login", credentials);
  }

  signup(credentials: SignupDTO) {
    return api.post<AuthResponse>("/auth/signup", credentials);
  }
}

export default new AuthService();
