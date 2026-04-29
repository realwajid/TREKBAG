import { create } from "zustand";
import { persist } from "zustand/middleware";
import { itemsInitial } from "../lib/constants";

export const useItemsStore = create(
  persist(
    (set) => ({
      items: itemsInitial,
      addItem: (newItemText) => {
        set((state) => {
          const newItem = {
            id: new Date().getTime(),
            name: newItemText,
            packed: false,
          };
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      toggleItem: (id) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, packed: !item.packed };
            }
            return item;
          }),
        }));
      },
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToInitial: () => {
        set(() => ({ items: itemsInitial }));
      },
      markAllAsComplete: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: true })),
        }));
      },
      markAllAsImcomplete: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: false })),
        }));
      },
    }),
    {
      name: "items",
    }
  )
);