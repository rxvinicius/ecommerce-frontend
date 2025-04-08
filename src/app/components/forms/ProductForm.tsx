/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  createProductSchema,
  updateProductSchema,
  CreateProductFormData,
  UpdateProductFormData,
} from "@/lib/validations/product.schema";

import { useCreateProduct, useUpdateProduct } from "@/hooks/useProductActions";
import useNumericInput from "@/hooks/useNumericInput";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/icons";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader, RemoveButton } from "@/components/shared";
import { ProductFormProps } from "@/types/product";

const MAX_FILES = 6;

export default function ProductForm({ action, product }: ProductFormProps) {
  const router = useRouter();
  const isCreate = action === "create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    setError,
  } = useForm<CreateProductFormData | UpdateProductFormData>({
    resolver: zodResolver(isCreate ? createProductSchema : updateProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      images: [],
    },
  });

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { value, handleChange, setValue: setNumericValue } = useNumericInput();

  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images || []
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isLoading = isCreating || isUpdating || isSubmitted;

  const dynamicMaxFiles = useMemo(() => {
    return MAX_FILES - (existingImages.length ?? 0);
  }, [existingImages]);

  const onSubmit = (data: CreateProductFormData | UpdateProductFormData) => {
    if (isCreate) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      (data.images || []).forEach((img) => formData.append("images", img));

      createProduct(formData, {
        onSuccess: () => {
          setIsSubmitted(true);
          reset();
          router.push("/products");
        },
      });
      return;
    }

    // UPDATE FLOW
    const updateData = {
      name: data.name,
      description: data.description,
      price: data.price,
    };

    const imagesToAdd = getValues("images") || [];
    const totalFinalImages = existingImages.length + imagesToAdd.length;

    if (totalFinalImages === 0) {
      setIsSubmitted(false);
      setError("images", {
        type: "manual",
        message: "Adicione pelo menos uma imagem ou mantenha uma existente.",
      });
      return;
    }

    updateProduct(
      {
        id: product!.id,
        data: updateData,
        imagesToAdd,
        imagesToRemove: removedImages,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          router.push("/products");
        },
      }
    );
  };

  const handleRemoveExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setRemovedImages((prev) => [...prev, url]);
  };

  useEffect(() => {
    if (product?.price) {
      const formatted = product.price.toFixed(2).replace(".", ",");
      setNumericValue(formatted);
    }
  }, [product, setNumericValue]);

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

        {/* Existing images + upload */}
        <div className="grid gap-2">
          <Label htmlFor="images">Imagens</Label>

          {!isCreate && existingImages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {existingImages.map((img, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    className="object-cover w-full h-full rounded-md border"
                  />
                  <RemoveButton
                    onClick={() => handleRemoveExistingImage(img)}
                  />
                </div>
              ))}
            </div>
          )}

          <FileUploader
            onChange={(files) => setValue("images", files)}
            disabled={isLoading}
            maxFiles={dynamicMaxFiles}
          />

          {errors.images && (
            <p className="small-medium error">{errors.images.message}</p>
          )}
        </div>

        {/* TODO: add error handling */}
        {/* {isError && <ErrorInfo error={error} context="criar produto" />} */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner className="animate-spin" />
          ) : isCreate ? (
            "Criar"
          ) : (
            "Atualizar"
          )}
        </Button>
      </div>
    </form>
  );
}
