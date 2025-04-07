"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { Pencil } from "lucide-react";

import { useGetProductById } from "@/hooks/useProductActions";
import ProductForm from "@/components/forms/ProductForm";
import PageHeader from "@/components/shared/PageHeader";
import { Spinner } from "@/components/ui/icons";
import AdminOnly from "@/components/auth/AdminOnly";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : "";

  const { data: product, isLoading, isError } = useGetProductById(id);

  useEffect(() => {
    if (isError) router.replace("/not-found");
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner className="animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <AdminOnly>
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-8">
          <PageHeader title="Editar Produto" icon={Pencil} />
          <ProductForm action="update" product={product} />
        </div>
      </div>
    </AdminOnly>
  );
}
