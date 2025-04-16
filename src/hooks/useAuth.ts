import { useEffect, useState } from "react";
import { isAdminUser } from "@/utils/auth";
import { authStorage } from "@/utils/authStorage";
import { AUTH_EVENT_KEY } from "@/constants/storage";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  const syncAuth = () => {
    setUser(authStorage.getUser());
    setAuthLoaded(true);
  };

  useEffect(() => {
    syncAuth();
    window.addEventListener(AUTH_EVENT_KEY, syncAuth);
    return () => window.removeEventListener(AUTH_EVENT_KEY, syncAuth);
  }, []);

  const isAdmin = user && isAdminUser(user.role);
  const isAuthenticated = !!user;

  return { user, isAdmin, isAuthenticated, authLoaded };
}
