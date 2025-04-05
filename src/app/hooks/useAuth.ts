import { useEffect, useState } from "react";
import { isAdminUser } from "@/utils/auth";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const syncAuth = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    syncAuth();

    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  const isAdmin = user && isAdminUser(user?.role);
  const isAuthenticated = !!user;

  return { user, isAdmin, isAuthenticated };
}
