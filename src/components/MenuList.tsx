// src/components/MenuList.tsx
"use client";
import MenuItem, { MenuItemType } from "./MenuItem";

export default function MenuList({ items, onAdd }: { items: MenuItemType[]; onAdd: (item: MenuItemType) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(item => (
        <MenuItem key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}
