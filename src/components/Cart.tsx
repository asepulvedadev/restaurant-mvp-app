// src/components/Cart.tsx
"use client";
import { MenuItemType } from "./MenuItem";

export default function Cart({ cart, onRemove, onClose }: {
  cart: { item: MenuItemType; qty: number }[];
  onRemove: (id: number) => void;
  onClose: () => void;
}) {
  const total = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);
  return (
    <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 flex flex-col border-l">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Carrito</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-black">✕</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {cart.length === 0 ? (
          <div className="text-gray-500">El carrito está vacío.</div>
        ) : (
          cart.map(({ item, qty }) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-gray-500">x{qty}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-700">${(item.price * qty).toFixed(2)}</span>
                <button onClick={() => onRemove(item.id)} className="text-red-500 hover:underline text-xs">Quitar</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t flex justify-between items-center">
        <span className="font-bold">Total:</span>
        <span className="text-lg">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
