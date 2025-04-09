"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useGetProducts } from "@/hooks/useProductActions";
import useProductDelete from "@/hooks/useProductDelete";
import useAuth from "@/hooks/useAuth";

import {
  ProductCard,
  Pagination,
  DeleteConfirmationModal,
} from "@/components/shared";
import { AlertTriangle, PackageSearch, Spinner } from "@/components/ui/icons";
import { Button } from "../ui/button";

const limit = 8;

export default function ProductList() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProducts({ page, limit });
  const { isAdmin } = useAuth();
  const {
    isModalOpen,
    isDeleting,
    productToDelete,
    handleOpenModal,
    handleCloseModal,
    handleDeleteConfirm,
  } = useProductDelete();

  if (isLoading && !isError)
    return (
      <div className="flex items-center text-center justify-center min-h-[300px]">
        <Spinner className="w-10 h-10 animate-spin text-primary" />
      </div>
    );

  if (isError || !products)
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-center text-destructive min-h-[300px]">
        <AlertTriangle className="w-8 h-8" />
        <p>Erro ao carregar produtos.</p>
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
          {isAdmin ? (
            <p className="text-sm text-muted-foreground">
              Comece agora cadastrando o primeiro!
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              A loja não foi inaugurada ainda!
            </p>
          )}
        </div>
        {isAdmin && (
          <Link href="/admin/products/new">
            <Button>Cadastrar produto</Button>
          </Link>
        )}
      </div>
    );

  return (
    <div className="flex flex-col flex-grow justify-between min-h-[70vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 place-items-center sm:place-items-start">
        {products.data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => router.push(`/admin/products/${product.id}/edit`)}
            onDelete={() => handleOpenModal(product)}
          />
        ))}
      </div>

      <div className="mt-auto pt-4">
        <Pagination
          page={page}
          lastPage={products.meta.lastPage}
          onPageChange={setPage}
        />
      </div>

      <DeleteConfirmationModal
        open={isModalOpen}
        isLoading={isDeleting}
        name={productToDelete?.name}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
