"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/hooks/useAuthActions";
import { authStorage } from "@/utils/authStorage";
import { isTokenExpired } from "@/utils/token";
import { UserRole } from "@/constants/user-role";

export default function useProtectedRoute(role?: UserRole) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (!token || isTokenExpired(token)) {
      logout();
      router.replace("/login");
      return;
    }

    if (role && user?.role !== role) {
      router.replace("/");
      return;
    }

    setAllowed(true);
    setLoading(false);
  }, [router, role]);

  return { loading, allowed };
}
