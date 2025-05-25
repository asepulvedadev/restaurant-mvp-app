// src/components/AppBar.tsx
"use client";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

export default function AppBar({ onCartClick }: { onCartClick: () => void }) {
  const { user } = useUser();
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-white/80">
      <div className="font-bold text-xl">Restaurante MVP</div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCartClick}
          className="relative bg-gray-100 rounded px-3 py-1 hover:bg-gray-200"
        >
          🛒 Carrito
        </button>
        <span className="text-sm text-gray-700 mr-2">{user?.email}</span>
        <button
          onClick={async () => await supabase.auth.signOut()}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
