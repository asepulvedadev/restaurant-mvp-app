// src/components/dashboard/RestaurantForm.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

export default function RestaurantForm({ onCreated }: { onCreated: () => void }) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (!user) {
      setMessage("Usuario no autenticado.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("restaurants").insert({
      name,
      description,
      address,
      phone,
      owner_id: user.id,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Restaurante creado correctamente");
      setName(""); setDescription(""); setAddress(""); setPhone("");
      onCreated();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex flex-col gap-3 max-w-md">
      <div className="font-bold text-lg mb-2">Nuevo restaurante</div>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 font-semibold hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Crear"}
      </button>
      {message && <div className="text-green-700 text-center mt-2">{message}</div>}
    </form>
  );
}
