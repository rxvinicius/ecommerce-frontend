"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productService from "@/api/services/productService";
import { GetProductsParams, PaginatedProductResponse } from "@/types/product";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => productService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      console.log(err);
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
