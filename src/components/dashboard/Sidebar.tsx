// src/components/dashboard/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Resumen" },
  { href: "/dashboard/profile", label: "Perfil" },
  { href: "/dashboard/restaurants", label: "Restaurantes" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full sm:w-56 bg-white border-r min-h-screen p-4 flex flex-col gap-2">
      <div className="font-bold text-lg mb-6">Dashboard</div>
      {links.map(link => (
        <Link key={link.href} href={link.href}>
          <span className={`block px-3 py-2 rounded hover:bg-gray-100 transition font-medium ${pathname === link.href ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}>
            {link.label}
          </span>
        </Link>
      ))}
    </aside>
  );
}
