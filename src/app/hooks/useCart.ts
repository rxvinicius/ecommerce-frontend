"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart";
import { cartStorage } from "@/utils/cartStorage";
import { CART_EVENT_KEY } from "@/constants/storage";

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = cartStorage.getCart();
    return Array.isArray(stored) ? stored : [];
  });

  const syncCart = () => {
    const stored = cartStorage.getCart();
    setCart(Array.isArray(stored) ? stored : []);
  };

  useEffect(() => {
    syncCart();
    window.addEventListener(CART_EVENT_KEY, syncCart);
    return () => {
      window.removeEventListener(CART_EVENT_KEY, syncCart);
    };
  }, []);

  const addToCart = (product: CartItem["product"], quantity: number = 1) => {
    const existing = cart.find((item) => item.product.id === product.id);
    const updatedCart = existing
      ? cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { product, quantity }];

    cartStorage.setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    cartStorage.setCart(updatedCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    cartStorage.setCart(updatedCart);
  };

  const clearCart = () => cartStorage.clearCart();

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
