// src/app/dashboard/DashboardGuard.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: userLoading } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && user) {
      supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setRole(data?.role || null);
          setLoading(false);
        });
    } else if (!userLoading && !user) {
      setLoading(false);
      setRole(null);
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (!loading && role !== "restaurant_admin") {
      router.replace("/");
    }
  }, [loading, role, router]);

  if (userLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (role !== "restaurant_admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-bold mb-4 text-red-600">Acceso denegado</div>
        <p className="text-gray-600">No tienes permisos para acceder a la dashboard.</p>
      </div>
    );
  }

  return <>{children}</>;
}
