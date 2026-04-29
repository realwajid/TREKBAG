import { useItemsStore } from "../stores/itemsStore";
import Counter from "./Counter";
import Logo from "./Logo";

export default function Header() {
  const items = useItemsStore((state) => state.items);

  const totalDone = items.filter((item) => item.packed).length;
  return (
    <header>
      <Logo />
      <Counter totalCount={items.length} totalDone={totalDone} />
    </header>
  );
}