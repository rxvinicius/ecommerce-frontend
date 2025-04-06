import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "O nome é obrigatório")
    .max(200, "Nome deve ter no máximo 200 caracteres"),
  description: z.string().min(10, "A descrição é obrigatória"),
  price: z.coerce.number().positive("O preço deve ser maior que 0"),
  images: z
    .array(z.instanceof(File))
    .min(1, "Adicione pelo menos uma imagem")
    .max(6, "Máximo de 6 imagens"),
});

export type ProductFormData = z.infer<typeof productSchema>;
