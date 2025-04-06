"use client";

import { PageHeader, ProductList } from "@/components/shared";
import { Package } from "@/components/ui/icons";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Produtos" icon={Package} />
      <ProductList />
    </div>
  );
}
