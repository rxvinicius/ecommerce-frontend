"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import orderService from "@/api/services/orderService";
import { OrderDTO } from "@/types/order";
import { ApiError } from "@/types/api";
import { cartStorage } from "@/utils/cartStorage";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderDTO) => orderService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Admin
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "orders" &&
          query.queryKey.length > 1, // ["orders", userId]
      }); // Customer

      cartStorage.clearCart();
    },
    onError: (err: AxiosError<ApiError>) => {
      throw new Error(
        err?.response?.data?.message ||
          "Erro ao finalizar pedido. Tente novamente mais tarde."
      );
    },
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getAll().then((res) => res.data),
  });
};

export const useGetOrdersByUser = (userId: string) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => orderService.getByUserId(userId).then((res) => res.data),
    enabled: !!userId,
  });
};
