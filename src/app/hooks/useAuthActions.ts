"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import authService from "@/api/services/authService";
import { LoginDTO, SignupDTO } from "@/types/auth";
import { isAdminUser } from "@/utils/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginDTO) => authService.login(data),
    onSuccess: (response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("auth-change"));
      router.push(isAdminUser(user.role) ? "/admin" : "/");
    },
    onError: (err: any) => {
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
    onSuccess: (response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("auth-change"));

      router.push("/");
    },
    onError: (err: any) => {
      const errorMessage =
        err.response?.data?.error === "Conflict"
          ? "E-mail já cadastrado"
          : "Erro ao cadastrar. Tente novamente mais tarde.";
      throw new Error(errorMessage);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  };
};
