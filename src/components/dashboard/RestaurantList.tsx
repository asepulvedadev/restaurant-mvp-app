// src/components/dashboard/RestaurantList.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

type Restaurant = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  created_at: string;
};

export default function RestaurantList() {
  const { user } = useUser();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    setLoading(true);
    if (!user) {
      setRestaurants([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("restaurants")
      .select("id, name, description, address, phone, created_at")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });
    setRestaurants(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchRestaurants();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Tus restaurantes</h3>
      {loading ? (
        <div>Cargando...</div>
      ) : restaurants.length === 0 ? (
        <div className="text-gray-500">No tienes restaurantes registrados.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {restaurants.map(r => (
            <li key={r.id} className="border rounded p-3 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="font-bold text-lg">{r.name}</div>
                {r.description && <div className="text-gray-500 text-sm">{r.description}</div>}
                {r.address && <div className="text-xs">📍 {r.address}</div>}
                {r.phone && <div className="text-xs">📞 {r.phone}</div>}
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">Ver</button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
