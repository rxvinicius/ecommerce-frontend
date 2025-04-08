"use client";

import Link from "next/link";
// TODO: add functionality to search for products
// import { SearchInput } from "@/components/ui/search-input"
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, PackagePlus } from "@/components/ui/icons";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { Input } from "../ui/input";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const { isAdmin, isAuthenticated } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-bold text-primary whitespace-nowrap"
          >
            Waving Store
          </Link>

          {/* Seach bar (web) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <Input placeholder="Buscar produtos..." />
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-2 relative">
            {isAdmin ? (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/products/new">
                  <PackagePlus className="w-6 h-6" />
                  <span className="sr-only">Adicionar produto</span>
                </Link>
              </Button>
            ) : (
              <div className="relative">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={isAuthenticated ? "/checkout" : "/login"}>
                    <ShoppingCart className="w-6 h-6" />
                    <span className="sr-only">Carrinho</span>
                  </Link>
                </Button>

                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow">
                    {totalItems}
                  </span>
                )}
              </div>
            )}

            <Button variant="ghost" size="icon">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <Link href={isAdmin ? "/admin" : "/login"}>
                  <User className="w-6 h-6" />
                  <span className="sr-only">Perfil</span>
                </Link>
              )}
            </Button>
          </div>
        </div>

        {/* Seach bar (mobile) */}
        <div className="mt-3 md:hidden">
          <Input placeholder="Buscar..." />
        </div>
      </div>
    </header>
  );
}
