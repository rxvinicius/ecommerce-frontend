"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/useCart";
import { runFireworks } from "@/lib/fireworks";
import { CheckCircle2 } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import CustomerOnly from "@/components/auth/CustomerOnly";

function SuccessContent() {
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    runFireworks();
  }, [clearCart]);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <CheckCircle2 className="w-16 h-16 text-green-500" />
      <h1 className="text-2xl font-bold">Obrigado pela sua compra!</h1>
      <p className="text-muted-foreground max-w-md">
        Seu pedido foi confirmado. <br />
        Em instantes você receberá um e-mail com os detalhes da sua compra.
      </p>

      <div className="flex flex-col sm:flex-row justify-center w-full gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push("/my-orders")}
        >
          Ver meus pedidos
        </Button>
        <Button
          size="lg"
          variant="default"
          onClick={() => router.push("/produtos")}
        >
          Continuar comprando
        </Button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <CustomerOnly>
      <SuccessContent />
    </CustomerOnly>
  );
}
