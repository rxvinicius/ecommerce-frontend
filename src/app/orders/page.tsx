/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useGetAllOrders } from "@/hooks/useOrderActions";
import { formatCurrency, lastFourDigits } from "@/lib/format";
import { AlertTriangle, PackageSearch, Spinner } from "@/components/ui/icons";
import { Pagination } from "@/components/shared";
import AdminOnly from "@/components/auth/AdminOnly";

const limit = 10;

function OrdersContent() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data: orders, isLoading, isError } = useGetAllOrders({ page, limit });

  if (isLoading && !isError) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !orders) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center text-destructive min-h-[300px]">
        <AlertTriangle className="w-8 h-8" />
        <p>Erro ao carregar pedidos.</p>
      </div>
    );
  }

  if (orders.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground min-h-[300px]">
        <PackageSearch className="w-10 h-10 text-primary" />
        <div>
          <p className="text-lg font-semibold text-foreground">
            Nenhum pedido encontrado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Todos os pedidos</h1>

      <div className="space-y-4">
        {orders.data.map((order) => (
          <div
            key={order.id}
            className="border rounded-md p-4 shadow-sm bg-white dark:bg-zinc-900"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>
                Pedido: <strong>{order.id.slice(0, 8)}...</strong>
              </span>
              <span>
                Cliente: <strong>{order.user.name}</strong>
              </span>
              <span>
                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded border cursor-pointer"
                    onClick={() => router.push(`/products/${item.product.id}`)}
                  />
                  <div className="text-sm">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-muted-foreground">
                      Quantidade: {item.quantity}
                    </p>
                    <p className="text-muted-foreground">
                      Cartão final: •••• {lastFourDigits(order.cardNumber)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right mt-3 font-semibold text-primary">
              Total: {formatCurrency(order.total)}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Pagination
          page={page}
          lastPage={orders.meta.lastPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AdminOnly>
      <OrdersContent />
    </AdminOnly>
  );
}
