"use client";

import { useState } from "react";
import { useGetProducts } from "@/hooks/useProductActions";
import { Pagination, ProductCard } from "@/components/shared";
import { AlertTriangle, PackageSearch, Spinner } from "@/components/ui/icons";
import Link from "next/link";
import { Button } from "../ui/button";

const limit = 6;

export default function ProductList() {
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProducts({ page, limit });

  if (isError || !products)
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center text-destructive min-h-[300px]">
        <AlertTriangle className="w-8 h-8" />
        <p>Erro ao carregar produtos.</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner className="w-10 h-10 animate-spin text-primary" />
      </div>
    );

  if (products.data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground min-h-[300px]">
        <PackageSearch className="w-10 h-10 text-primary" />
        <div>
          <p className="text-lg font-semibold text-foreground">
            Nenhum produto encontrado
          </p>
          <p className="text-sm text-muted-foreground">
            Comece agora cadastrando o primeiro!
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>Cadastrar produto</Button>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col justify-center sm:justify-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {products.data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => console.log("edit")}
            onDelete={() => console.log("delete")}
          />
        ))}
      </div>

      <Pagination
        page={page}
        lastPage={products.meta.lastPage}
        onPageChange={setPage}
      />
    </div>
  );
}
