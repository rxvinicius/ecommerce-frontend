import { CART_KEY, CART_EVENT_KEY } from "@/constants/storage";
import { CartItem } from "@/types/cart";

export const cartStorage = {
  getCart(): CartItem[] {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  setCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event(CART_EVENT_KEY));
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event(CART_EVENT_KEY));
  },
};
