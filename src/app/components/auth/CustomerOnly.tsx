"use client";

import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/icons";
import useAuth from "@/hooks/useAuth";

type CustomerOnlyProps = {
  children: React.ReactNode;
};

/**
 * TODO: Replace this client-side admin-only wrapper with a server-side cookie-based auth solution.
 * This approach using localStorage is simpler and faster to implement for this challenge,
 * but the ideal solution in a production environment would involve storing the auth token in secure HttpOnly cookies
 * and performing access control via middleware or server-side logic to avoid client-side flashes and improve security.
 */
export default function CustomerOnly({ children }: CustomerOnlyProps) {
  const router = useRouter();
  const { isAuthenticated, isAdmin, authLoaded } = useAuth();

  if (!authLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || isAdmin) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }

  return <>{children}</>;
}
