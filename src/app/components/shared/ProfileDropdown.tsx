"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { logout } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Package, Settings, User } from "@/components/ui/icons";

export default function ProfileDropdown() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Perfil</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-white shadow-lg rounded-md p-1 border border-gray-100"
      >
        {/* TODO: Add my profile feature */}
        <DropdownMenuItem className="dropdown-menu-item hover:bg-gray-50">
          <User className="icon text-gray-600" />
          <span>Meu Perfil</span>
        </DropdownMenuItem>

        {/* TODO: Add admin panel */}
        {isAdmin ? (
          <>
            <DropdownMenuItem className="dropdown-menu-item hover:bg-gray-50">
              <Settings className="icon text-gray-600" />
              <span>Painel Admin</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dropdown-menu-item hover:bg-gray-50"
              onClick={() => router.push("/orders")}
            >
              <Package className="icon text-gray-600" />
              <span>Pedidos</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            className="dropdown-menu-item hover:bg-gray-50"
            onClick={() => router.push("/my-orders")}
          >
            <Package className="icon text-gray-600" />
            <span>Meus Pedidos</span>
          </DropdownMenuItem>
        )}

        <div className="border-t border-gray-100 my-1"></div>

        <DropdownMenuItem
          className="dropdown-menu-item text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="icon" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
