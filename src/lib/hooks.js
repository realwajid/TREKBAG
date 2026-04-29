import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContextProvider";

export function useItemsContext() {
  const context = useContext(ItemsContext);
  return context;
}