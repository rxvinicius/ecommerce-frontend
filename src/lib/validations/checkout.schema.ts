import { z } from "zod";

export const checkoutCardSchema = z.object({
  number: z
    .string()
    .min(19, "Número do cartão inválido")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Número inválido"),
  name: z.string().min(3, "Nome é obrigatório"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Data de validade inválida"),
  cvc: z.string().min(3, "CVC inválido").max(4, "CVC inválido"),
});

export type CheckoutCardFormData = z.infer<typeof checkoutCardSchema>;
