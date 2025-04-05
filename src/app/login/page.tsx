"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // TODO: Use HTTP-only cookies for auth and redirect via middleware
  // Using localStorage causes a delay before redirecting protected pages.
  // Middleware with cookies can block access before rendering.
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold leading-[140%] text-center">
        Faça login na sua conta
      </h1>
      <p className="text-gray-600 mb-6 leading-[140%] small-medium md:base-regular mt-2 text-center">
        Bem-vindo de volta! Insira os detalhes da sua conta
      </p>
      <LoginForm />
    </div>
  );
}
