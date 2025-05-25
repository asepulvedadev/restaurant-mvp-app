// src/components/dashboard/ProfileForm.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

export default function ProfileForm() {
  const { user } = useUser();
  type Profile = {
    username: string;
    avatar_url: string;
    role: string;
  };
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("username, avatar_url, role")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setProfile(data);
          setUsername(data?.username || "");
          setAvatarUrl(data?.avatar_url || "");
          setLoading(false);
        });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!user) {
      setMessage("Usuario no autenticado.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("profiles").update({
      username,
      avatar_url: avatarUrl,
    }).eq("id", user.id);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Perfil actualizado correctamente");
    }
    setLoading(false);
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleSave} className="max-w-md mx-auto flex flex-col gap-4 bg-white p-6 rounded shadow">
      <div className="flex flex-col items-center gap-2">
        <Image 
          src={avatarUrl || "/avatar-placeholder.png"}
          alt="Avatar"
          className="w-20 h-20 rounded-full border object-cover"
        />
        <input
          type="text"
          placeholder="URL del avatar"
          value={avatarUrl}
          onChange={e => setAvatarUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <label className="flex flex-col gap-1">
        <span className="font-medium">Nombre de usuario</span>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
      </label>
      <div className="flex flex-col gap-1">
        <span className="font-medium">Correo electrónico</span>
        <span className="bg-gray-100 rounded p-2">{user?.email ?? "Sin correo"}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">Rol</span>
        <span className="bg-gray-100 rounded p-2">{profile?.role}</span>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 font-semibold hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        Guardar cambios
      </button>
      {message && <div className="text-green-700 text-center mt-2">{message}</div>}
    </form>
  );
}
