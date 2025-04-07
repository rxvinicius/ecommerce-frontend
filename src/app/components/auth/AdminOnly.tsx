"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/icons";
import useAuth from "@/hooks/useAuth";

type AdminOnlyProps = {
  children: React.ReactNode;
};

/**
 * TODO: Replace this client-side admin-only wrapper with a server-side cookie-based auth solution.
 * This approach using localStorage is simpler and faster to implement for this challenge,
 * but the ideal solution in a production environment would involve storing the auth token in secure HttpOnly cookies
 * and performing access control via middleware or server-side logic to avoid client-side flashes and improve security.
 */
export default function AdminOnly({ children }: AdminOnlyProps) {
  const router = useRouter();
  const { isAdmin, authLoaded } = useAuth();

  useEffect(() => {
    if (authLoaded && !isAdmin) {
      router.push("/");
    }
  }, [authLoaded, isAdmin, router]);

  if (!authLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return <>{children}</>;
}
