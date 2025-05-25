// src/components/MenuItem.tsx
"use client";
export type MenuItemType = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function MenuItem({ item, onAdd }: { item: MenuItemType; onAdd: (item: MenuItemType) => void }) {
  return (
    <div className="border rounded p-4 flex flex-col gap-2 bg-white shadow-sm">
      <div className="font-semibold text-lg">{item.name}</div>
      <div className="text-gray-500 text-sm">{item.description}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-green-700 font-bold">${item.price.toFixed(2)}</span>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => onAdd(item)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
