"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  productSchema,
  ProductFormData,
} from "@/lib/validations/product.schema";
import { useCreateProduct } from "@/hooks/useProductActions";
import useNumericInput from "@/hooks/useNumericInput";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/icons";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";
// TODO: Add error info
// import ErrorInfo from "../auth/ErrorInfo";
import { ProductFormProps } from "@/types/product";

export default function ProductForm({ action, product }: ProductFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      images: [],
    },
  });
  const { value, handleChange } = useNumericInput();

  const {
    mutate: createProduct,
    isPending: isLoading,
    isError,
    error,
  } = useCreateProduct();

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    data.images.forEach((img) => formData.append("images", img));

    createProduct(formData, {
      onSuccess: () => {
        reset();
        router.push("/admin");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 max-w-2xl">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Nome do produto"
            autoComplete="off"
            {...register("name")}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="small-medium error">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Digite a descrição do produto..."
            autoComplete="off"
            rows={4}
            {...register("description")}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="small-medium error">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Preço</Label>
          <Input
            id="price"
            type="tel"
            inputMode="decimal"
            pattern="[0-9.,]*"
            placeholder="Ex: 19,90"
            autoComplete="off"
            value={value}
            onChange={(e) => {
              handleChange(e);
              setValue("price", parseFloat(e.target.value.replace(",", ".")));
            }}
            disabled={isLoading}
          />

          {errors.price && (
            <p className="small-medium error">{errors.price.message}</p>
          )}
        </div>

        {/* <div className="grid gap-2">
          <Label htmlFor="images">Imagens</Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
            disabled={isLoading}
          />
          {errors.images && (
            <p className="small-medium error">{errors.images.message}</p>
          )}
        </div> */}

        <div className="grid gap-2">
          <Label htmlFor="images">Imagens</Label>
          <FileUploader
            onChange={(files) => setValue("images", files)}
            disabled={isLoading}
          />
          {errors.images && (
            <p className="small-medium error">{errors.images.message}</p>
          )}
        </div>

        {/* {isError && <ErrorInfo error={error} context="criar produto" />} */}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner className="animate-spin" />
          ) : action === "create" ? (
            "Criar"
          ) : (
            "Atualizar"
          )}
        </Button>
      </div>
    </form>
  );
}
