// src/app/login/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/lib/useUser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [adminRole, setAdminRole] = useState(false);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          setAdminRole(data?.role === "restaurant_admin");
        });
    } else {
      setAdminRole(false);
    }
  }, [user]);

  useEffect(() => {
    if (!userLoading && user) {
      router.replace("/");
    }
  }, [user, userLoading, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (isRegister) {
      // Registro
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Registro exitoso. Revisa tu correo para verificar la cuenta.");
      }
    } else {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      }
    }
    setLoading(false);
  };

  if (userLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (user) {
    // Esto es redundante porque el useEffect redirige, pero por si acaso
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl mb-4">Ya has iniciado sesión</h2>
        {adminRole && (
          <a
            href="/dashboard"
            className="bg-green-600 text-white rounded p-2 w-72 font-semibold hover:bg-green-700 text-center mb-4"
          >
            Ir a dashboard de administrador
          </a>
        )}
        <button
          className="bg-red-600 text-white rounded p-2 w-72 font-semibold hover:bg-red-700"
          onClick={async () => {
            await supabase.auth.signOut();
            router.refresh();
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h1>
      <form onSubmit={handleAuth} className="flex flex-col gap-2 w-72">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 font-semibold hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (isRegister ? "Registrando..." : "Entrando...") : (isRegister ? "Registrarse" : "Entrar")}
        </button>
      </form>
      <button
        className="underline mt-4 text-sm"
        onClick={() => setIsRegister(!isRegister)}
        disabled={loading}
      >
        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
      {message && <div className="mt-4 text-center text-red-600">{message}</div>}
    </div>
  );
}

