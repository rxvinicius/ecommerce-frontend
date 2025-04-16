import { z } from "zod";

const productSchemaBase = z.object({
  name: z
    .string()
    .min(3, "O nome é obrigatório")
    .max(200, "Nome deve ter no máximo 200 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  price: z.coerce.number().positive("O preço deve ser maior que 0"),
});

export const createProductSchema = productSchemaBase.extend({
  images: z
    .array(z.instanceof(File))
    .min(1, "Adicione pelo menos uma imagem")
    .max(6, "Máximo de 6 imagens"),
});

export const updateProductSchema = productSchemaBase.extend({
  images: z.array(z.instanceof(File)).max(6, "Máximo de 6 imagens").optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
