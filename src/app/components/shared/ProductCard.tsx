/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Edit, Trash } from "@/components/ui/icons";
import { Product } from "@/types/product";
import useAuth from "@/hooks/useAuth";

type Props = {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddToCart?: () => void;
};

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  onAddToCart,
}: Props) {
  const router = useRouter();
  const { isAdmin, authLoaded } = useAuth();

  if (!authLoaded) return null;

  return (
    <div
      className="w-full max-w-sm border rounded-xl p-4 flex flex-col gap-2 shadow-sm cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h3 className="font-semibold text-lg mt-2 truncate">{product.name}</h3>
      <p className="text-muted-foreground text-sm truncate">
        {product.description}
      </p>

      <p className="text-primary font-bold text-lg mt-1">
        R$ {product.price.toFixed(2)}
      </p>

      <div className="flex gap-2 mt-auto">
        {isAdmin ? (
          <div className="flex flex-row justify-between w-full">
            <Button
              variant="outline"
              size="sm"
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
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <Trash className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao carrinho
          </Button>
        )}
      </div>
    </div>
  );
}
