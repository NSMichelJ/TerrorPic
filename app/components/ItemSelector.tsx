import Image from "next/image";
import { Item } from "@/app/types";

interface ItemSelectorProps {
  items: Item[];
  selectedItem: string;
  setSelectedItem: (name: string) => void;
  title: string;
  className?: string;
}

function ItemSelector({
  items,
  selectedItem,
  setSelectedItem,
  title,
  className,
}: ItemSelectorProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium mb-2 text-slate-200">{title}</h3>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => setSelectedItem(item.key)}
            className="cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.name}
              height={100}
              width={100}
              className={`rounded w-auto h-auto mx-auto ${
                selectedItem === item.key ? "ring-2 ring-medium-purple-600" : ""
              }`}
            />
            <p className="text-sm text-center text-slate-200">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemSelector;
