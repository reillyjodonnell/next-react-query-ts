import { useEffect, useState } from 'react';
export default function Cart({ items, setItems, removeItem }: any) {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div className="cursor-pointer text-xl">
      <span
        onClick={() => setShowExpanded((prev) => !prev)}
        className=" cursor-pointer"
      >
        🛒
        <span className="border-white rounded-full p-2">
          {items.length ?? 0}
        </span>
      </span>
      <div className="flex flex-col">
        {showExpanded
          ? items.map((item, index) => {
              const formattedPrice = (item.price / 100).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                }
              );
              const { name, image, quantity } = item;
              return (
                <div
                  className="mx-2 flex  justify-center items-center"
                  key={`item-${name}`}
                >
                  <div>
                    <img className="w-24 h-24" src={image} />
                  </div>
                  <div className="flex flex-col mx-2">
                    <span>{formattedPrice}</span>
                  </div>
                  <span>{quantity}</span>
                  <div onClick={() => removeItem(index)}>❌</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
