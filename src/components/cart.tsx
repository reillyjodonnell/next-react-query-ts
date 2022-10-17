import { useEffect, useState } from 'react';
export default function Cart({ items }: any) {
  const [showExpanded, setShowExpanded] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div
      className="cursor-pointer"
      onClick={() => setShowExpanded((prev) => !prev)}
    >
      <span className=" cursor-pointer">
        🛒
        <span className="border-white rounded-full p-2">
          {items.length ?? 0}
        </span>
      </span>
      <div className="flex flex-col">
        {showExpanded
          ? items.map((item, index) => {
              return (
                <span
                  className="px-4 py-2 my-2 border-white border-2"
                  key={`cart-${index}`}
                >
                  {item.name}
                </span>
              );
            })
          : null}
      </div>
    </div>
  );
}
