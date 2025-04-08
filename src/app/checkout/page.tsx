"use client";

import CustomerOnly from "@/components/auth/CustomerOnly";
import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/lib/format";
import { ShoppingCart, PackageSearch } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/shared";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <CustomerOnly>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-primary" />
          Finalizar Compra
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-muted-foreground mt-10 flex flex-col items-center gap-4">
            <PackageSearch className="w-10 h-10 text-primary" />
            <p className="text-lg font-semibold">Seu carrinho está vazio</p>
            <Button onClick={() => router.push("/products")}>
              Explorar produtos
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-md p-4 shadow-sm"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Unitário: {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6">
                  <QuantityInput
                    value={quantity}
                    onIncrement={() => updateQuantity(product.id, quantity + 1)}
                    onDecrement={() =>
                      quantity === 1
                        ? removeFromCart(product.id)
                        : updateQuantity(product.id, quantity - 1)
                    }
                  />
                  <div className="text-right font-semibold text-primary min-w-[120px]">
                    {formatCurrency(quantity * product.price)}
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
              <span>Total ({totalItems} itens)</span>
              <span>{formatCurrency(totalValue)}</span>
            </div>
          </div>
        )}
      </div>
    </CustomerOnly>
  );
}
