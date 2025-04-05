"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/icons";
import authService from "@/api/services/authService";
import Link from "next/link";
import { SignUpFormData, signUpSchema } from "@/lib/validations/auth.schema";

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    authService
      .signup(data)
      .then((response) => {
        const { user, token } = response.data;
        router.push("/");
      })
      .catch((err) => {
        const { data } = err.response;
        console.log(data);
        setError(
          data.error === "Conflict" ? "Email já cadastrado." : "Ocorreu um erro"
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
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
              placeholder="seu@email.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="small-medium error">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="small-medium error">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="flex justify-center">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="h-4 w-4 animate-spin" />
            ) : (
              "Entrar"
            )}
          </Button>

          <p className="text-dark-1 text-center mt-2">
            Tem uma conta?&nbsp;
            <Link href="/sign-up" className="text-primary font-semibold">
              Conecte-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
