"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import authService from "@/api/services/authService";
import { AuthResponse, LoginDTO, SignupDTO } from "@/types/auth";
import { ApiError } from "@/types/api";
import { isAdminUser } from "@/utils/auth";
import { authStorage } from "@/utils/authStorage";
import { cartStorage } from "@/utils/cartStorage";

function handleAuthSuccess(
  data: AuthResponse,
  router: ReturnType<typeof useRouter>
) {
  authStorage.setAuth(data.token, data.user);
  router.push(isAdminUser(data.user.role) ? "/admin" : "/");
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginDTO) => authService.login(data),
    onSuccess: ({ data }) => handleAuthSuccess(data, router),
    onError: (err: AxiosError<ApiError>) => {
      throw new Error(
        err?.response?.data?.error === "Unauthorized"
          ? "Email ou senha inválidos."
          : "Erro ao tentar login. Tente novamente mais tarde"
      );
    },
  });
};

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupDTO) => authService.signup(data),
    onSuccess: ({ data }) => handleAuthSuccess(data, router),
    onError: (err: AxiosError<ApiError>) => {
      const errorMessage =
        err?.response?.data?.error === "Conflict"
          ? "E-mail já cadastrado"
          : "Erro ao cadastrar. Tente novamente mais tarde.";
      throw new Error(errorMessage);
    },
  });
};

export const logout = () => {
  authStorage.clearAuth();
  cartStorage.clearCart();
};
