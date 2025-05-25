"use client";
// src/app/dashboard/page.tsx
import { useState } from "react";
import MenuForm from "@/components/dashboard/MenuForm";
import MenuList from "@/components/dashboard/MenuList";

export default function DashboardPage() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de menú</h2>
      <MenuForm onCreated={() => setRefresh(r => r + 1)} />
      <MenuList refresh={refresh} />
    </div>
  );
}
