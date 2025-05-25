"use client";
// src/app/dashboard/restaurants/page.tsx
import { useState } from "react";
import RestaurantForm from "@/components/dashboard/RestaurantForm";
import RestaurantList from "@/components/dashboard/RestaurantList";

export default function RestaurantsPage() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tus restaurantes</h2>
      <RestaurantForm onCreated={() => setRefresh(r => r + 1)} />
      {/* RestaurantList se actualizará cuando refresh cambie */}
      <RestaurantList key={refresh} />
    </div>
  );
}
