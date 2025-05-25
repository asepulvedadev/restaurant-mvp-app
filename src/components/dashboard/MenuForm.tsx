// src/components/dashboard/MenuForm.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MenuForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.from("menu_items").insert({
      name,
      description,
      price: parseFloat(price),
      category,
      image_url: imageUrl,
      available,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Plato creado correctamente");
      setName(""); setDescription(""); setPrice(""); setCategory(""); setImageUrl(""); setAvailable(true);
      onCreated();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex flex-col gap-3 max-w-md">
      <div className="font-bold text-lg mb-2">Nuevo plato</div>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={e => setPrice(e.target.value)}
        min="0"
        step="0.01"
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Categoría (opcional)"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="URL de imagen (opcional)"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        className="border p-2 rounded"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={available}
          onChange={e => setAvailable(e.target.checked)}
        />
        Disponible
      </label>
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
