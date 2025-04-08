"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrderActions";
import { formatCurrency } from "@/lib/format";
import {
  checkoutCardSchema,
  CheckoutCardFormData,
} from "@/lib/validations/checkout.schema";

import CustomerOnly from "@/components/auth/CustomerOnly";
import { ShoppingCart, PackageSearch } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/shared";
import CreditCardForm from "@/components/forms/CreditCardForm";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const form = useForm<CheckoutCardFormData>({
    resolver: zodResolver(checkoutCardSchema),
    mode: "onBlur",
  });

  const handlePurchase = form.handleSubmit((data) => {
    const payload = {
      items: cart.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
      total: totalValue,
      card: {
        number: data.number,
        name: data.name,
        expiry: data.expiry,
      },
    };

    createOrder(payload, {
      onSuccess: () => {
        console.log("Pedido finalizado!");
        router.push("/");
      },
      onError: (err) => {
        console.error("Erro ao finalizar pedido:", err);
      },
    });
  });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <CustomerOnly>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {cart.length === 0 ? (
          <div className="text-center text-muted-foreground mt-10 flex flex-col items-center gap-4">
            <PackageSearch className="w-10 h-10 text-primary" />
            <p className="text-lg font-semibold">Seu carrinho está vazio</p>
            <Button onClick={() => router.push("/products")}>
              Explorar produtos
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              Finalizar Compra
            </h1>

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
                      onIncrement={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
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

              <div className="border-t pt-4 mt-4 mb-10 flex justify-between text-lg font-semibold">
                <span>Total ({totalItems} itens)</span>
                <span>{formatCurrency(totalValue)}</span>
              </div>

              <FormProvider {...form}>
                <div>
                  <h2 className="text-xl font-medium mb-4 mt-6">
                    Detalhes do Pagamento
                  </h2>
                  <CreditCardForm />
                </div>

                <div className="text-right mt-6">
                  <Button
                    onClick={handlePurchase}
                    className="w-full sm:w-auto"
                    disabled={isPending}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </FormProvider>
            </div>
          </>
        )}
      </div>
    </CustomerOnly>
  );
}
