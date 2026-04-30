import Select from "react-select";
import EmptyState from "./EmptyState";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore";

const sortingOptions = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by packed", value: "packed" },
  { label: "Sort by unpacked", value: "unpacked" },
];

export default function ItemList() {
  const items = useItemsStore((state) => state.items);
  const removeItem = useItemsStore((state) => state.removeItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const [sortBy, setSortBy] = useState("default");

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "unpacked") {
          return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
        }
        if (sortBy === "packed") {
          return a.packed === b.packed ? 0 : a.packed ? -1 : 1;
        }
        return 0; 
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyState />}

      {items.length > 0 && (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      )}

      {sortedItems.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onRemoveItem={removeItem}
          handleToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

function ListItem({ item, onRemoveItem, handleToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => handleToggleItem(item.id)}
          checked={item.packed}
          type="checkbox"
        />
        {item.name}
      </label>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}