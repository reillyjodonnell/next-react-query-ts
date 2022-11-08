import { useState } from 'react';
export default function Cart({
  items,
  setItems,
  removeItem,
  subtractQuantity,
  increaseQuantity,
}: any) {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div className="cursor-pointer text-xl">
      <span
        onClick={() => setShowExpanded((prev) => !prev)}
        className=" cursor-pointer"
      >
        🛒
        <span className="border-white rounded-full p-2">
          {items?.length ?? 0}
        </span>
      </span>
      <div className="flex flex-col relative">
        {showExpanded ? (
          <div className="flex flex-col justify-center items-center absolute mt-2 p-4 right-0 top-0 w-80 h-fit bg-[#141414b6] border-[#ffffff7b] border-2">
            {items.length > 0 ? (
              items?.map((item) => {
                const formattedPrice = (item?.price / 100 ?? 0).toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                );
                const { name, image, quantity, id } = item;
                return (
                  <div
                    className="mx-2 flex  justify-center items-center"
                    key={`item-${name}`}
                  >
                    <img className="w-24 h-24" src={image} />
                    <div className="flex flex-col mx-2">
                      <span>{formattedPrice}</span>
                    </div>
                    <span>{quantity}</span>
                    <div className="flex flex-col justify-center items-center mx-2">
                      <span
                        className="text-3xl"
                        onClick={() => increaseQuantity({ id })}
                      >
                        +
                      </span>
                      <span
                        className="text-3xl "
                        onClick={() => subtractQuantity({ id })}
                      >
                        -
                      </span>
                    </div>
                    <span
                      className="text-xl "
                      onClick={() => removeItem({ id })}
                    >
                      ❌
                    </span>
                  </div>
                );
              })
            ) : showExpanded && items.length === 0 ? (
              <span>Add something to your cart!</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
