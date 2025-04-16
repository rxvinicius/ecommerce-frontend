"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import orderService from "@/api/services/orderService";
import { AdminOrderResponse, OrderDTO, OrderResponse } from "@/types/order";
import { ApiError } from "@/types/api";
import { PaginationParams, PaginatedResponse } from "@/types/pagination";

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
    },
    onError: (err: AxiosError<ApiError>) => {
      throw new Error(
        err?.response?.data?.message ||
          "Erro ao finalizar pedido. Tente novamente mais tarde."
      );
    },
  });
};

export const useGetAllOrders = (params?: PaginationParams) => {
  return useQuery<PaginatedResponse<AdminOrderResponse>>({
    queryKey: ["orders", params],
    queryFn: () => orderService.getAll(params).then((res) => res.data),
  });
};

export const useGetOrdersByUser = (
  userId: string,
  params?: PaginationParams
) => {
  return useQuery<PaginatedResponse<OrderResponse>>({
    queryKey: ["orders", userId, params],
    queryFn: () =>
      orderService.getByUserId(userId, params).then((res) => res.data),
    enabled: !!userId,
  });
};
