"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff, Spinner } from "@/components/ui/icons";
import { SignUpFormData, signUpSchema } from "@/lib/validations/auth.schema";
import { useSignUp } from "@/hooks/useAuthActions";
import ErrorInfo from "./ErrorInfo";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signUp, isPending: isLoading, isError, error } = useSignUp();
  const onSubmit = async (data: SignUpFormData) => signUp(data);

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              autoComplete="off"
              placeholder="Seu nome completo"
              {...register("name")}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="small-medium error">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              placeholder="seu@email.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="small-medium error">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••"
              {...register("password")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 bottom-2 text-muted-foreground cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="small-medium error">{errors.password.message}</p>
            )}
          </div>

          {isError && <ErrorInfo error={error} context="signup" />}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner className="animate-spin" /> : "Cadastrar"}
          </Button>

          <p className="text-dark-1 text-center mt-2">
            Tem uma conta?&nbsp;
            <Link href="/login" className="text-primary font-semibold">
              Conecte-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
