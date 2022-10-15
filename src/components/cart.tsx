import { useState } from 'react';
export default function Cart({ items }: any) {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onClick={() => setShowExpanded((prev) => !prev)}
    >
      <span>
        🛒
        <span>{items.length ?? 0}</span>
      </span>
      <div className="flex flex-col">
        {showExpanded
          ? items.map((item, index) => {
              return (
                <span
                  className="p-4 border-white border-2"
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
