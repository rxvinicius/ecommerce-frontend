"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import productService from "@/api/services/productService";
import {
  CreateProductDTO,
  GetProductsParams,
  PaginatedProductResponse,
  Product,
} from "@/types/product";
import type { ApiError } from "@/types/api";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => productService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      throw new Error(
        err?.response?.data?.message ||
          "Erro ao criar produto. Tente novamente mais tarde."
      );
    },
  });
};

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery<PaginatedProductResponse>({
    queryKey: ["products", params],
    queryFn: () => productService.getAll(params).then((res) => res.data),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      imagesToAdd,
      imagesToRemove,
    }: {
      id: string;
      data: Partial<CreateProductDTO>;
      imagesToAdd: File[];
      imagesToRemove: string[];
    }) => {
      const formData = new FormData();
      formData.append("name", data.name || "");
      formData.append("description", data.description || "");
      formData.append("price", data.price?.toString() || "");

      imagesToAdd.forEach((img) => formData.append("images", img));
      formData.append("imagesToRemove", JSON.stringify(imagesToRemove));

      return productService.updateMultipart(id, formData);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
    onError: (err: AxiosError<ApiError>) => {
      throw new Error(
        err?.response?.data?.message ||
          "Erro ao atualizar produto. Tente novamente mais tarde."
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: AxiosError<ApiError>) => {
      throw new Error(
        err?.response?.data?.message ||
          "Erro ao excluir produto. Tente novamente mais tarde."
      );
    },
  });
};
