import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 60;
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 200;

const baseAuthSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `Senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`
    ),
  name: z
    .string()
    .min(
      NAME_MIN_LENGTH,
      `Nome deve ter no mínimo ${NAME_MIN_LENGTH} caracteres`
    )
    .max(
      NAME_MAX_LENGTH,
      `Nome deve ter no máximo ${NAME_MAX_LENGTH} caracteres`
    ),
});

export const loginSchema = baseAuthSchema.pick({
  email: true,
  password: true,
});

export const signUpSchema = baseAuthSchema;

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
