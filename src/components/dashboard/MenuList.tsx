// src/components/dashboard/MenuList.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  available: boolean;
};

export default function MenuList({ refresh }: { refresh: number }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("menu_items")
      .select("id, name, description, price, category, image_url, available")
      .order("name", { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();

  }, [refresh]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Platos en el menú</h3>
      {loading ? (
        <div>Cargando...</div>
      ) : items.length === 0 ? (
        <div className="text-gray-500">No hay platos registrados.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map(item => (
            <li key={item.id} className="border rounded p-3 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-4">
                {item.image_url && (
                  <Image src={item.image_url} alt={item.name} width={64} height={64} className="w-16 h-16 object-cover rounded" />
                )}
                <div>
                  <div className="font-bold text-lg">{item.name}</div>
                  <div className="text-gray-500 text-sm">{item.description}</div>
                  <div className="text-xs">{item.category && <>🍽️ {item.category} | </>}${item.price.toFixed(2)}</div>
                  {!item.available && <span className="text-red-500 text-xs font-bold">No disponible</span>}
                </div>
              </div>
              {/* Aquí puedes agregar botones para editar/eliminar en el futuro */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
