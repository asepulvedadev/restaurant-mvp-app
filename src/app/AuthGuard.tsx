// src/app/AuthGuard.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/lib/useUser";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Permitir acceso libre solo a /login
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/login");
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  // Si no está autenticado y no es /login, no renderizar nada
  if (!user && !isLoginPage) {
    return null;
  }

  return <>{children}</>;
}
