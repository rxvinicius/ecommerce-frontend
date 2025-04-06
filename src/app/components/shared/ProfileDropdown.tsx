"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "@/components/ui/icons";
import useAuth from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useAuthActions";

export default function ProfileDropdown() {
  const { isAdmin } = useAuth();
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full"
        >
          <User className="header-icon" />
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
        {isAdmin && (
          <DropdownMenuItem className="dropdown-menu-item hover:bg-gray-50">
            <Settings className="icon text-gray-600" />
            <span>Painel Admin</span>
          </DropdownMenuItem>
        )}

        <div className="border-t border-gray-100 my-1"></div>

        <DropdownMenuItem
          className="dropdown-menu-item text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="icon" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
