"use client";
import { useState } from "react";
import AppBar from "@/components/AppBar";
import MenuList from "@/components/MenuList";
import Cart from "@/components/Cart";
import type { MenuItemType } from "@/components/MenuItem";

const MOCK_MENU: MenuItemType[] = [
  { id: 1, name: "Hamburguesa Clásica", description: "Carne 100% res, queso, lechuga, tomate.", price: 7.5 },
  { id: 2, name: "Pizza Margarita", description: "Masa artesanal, tomate, mozzarella, albahaca.", price: 9.0 },
  { id: 3, name: "Ensalada César", description: "Pollo, lechuga, parmesano, aderezo césar.", price: 6.5 },
  { id: 4, name: "Tacos al Pastor", description: "Tortilla de maíz, cerdo adobado, piña.", price: 8.0 },
  { id: 5, name: "Limonada", description: "Refrescante bebida natural.", price: 2.5 },
];

export default function Home() {
  const [cart, setCart] = useState<{ item: MenuItemType; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (item: MenuItemType) => {
    setCart(prev => {
      const found = prev.find(c => c.item.id === item.id);
      if (found) {
        return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(c => c.item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar onCartClick={() => setCartOpen(true)} />
      <main className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Menú</h2>
        <MenuList items={MOCK_MENU} onAdd={handleAddToCart} />
      </main>
      {cartOpen && (
        <Cart cart={cart} onRemove={handleRemoveFromCart} onClose={() => setCartOpen(false)} />
      )}
    </div>
  );
}
