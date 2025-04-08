/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "@/components/ui/icons";
import { Product } from "@/types/product";
import useAuth from "@/hooks/useAuth";

type Props = {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  const router = useRouter();
  const { isAdmin, authLoaded } = useAuth();

  if (!authLoaded) return null;

  return (
    <div className="group w-full max-w-sm border rounded-xl p-4 flex flex-col gap-2 shadow-sm transition hover:shadow-md bg-white dark:bg-zinc-900 cursor-pointer">
      <div
        className="relative w-full h-48 overflow-hidden rounded-lg"
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-muted-foreground text-sm truncate">
          {product.description}
        </p>
        <p className="text-primary font-bold text-xl">
          R$ {product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex gap-2 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
        {isAdmin && (
          <div className="flex flex-row w-full justify-between">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
            >
              <Edit className="h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <Trash className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
