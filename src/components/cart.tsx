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
                    className="mx-2 py-4 border-b border-[#ffffff17] flex h-[200px] w-[250px] justify-center items-center"
                    key={`item-${name}`}
                  >
                    <img className="w-full h-full" src={image} />
                    <div className="flex flex-col justify-center items-start h-full">
                      <div className="flex flex-col mx-2 mb-6">
                        <span className="text-xl font-bold">{name}</span>

                        <span className="text-sm font-light">
                          {formattedPrice}
                        </span>
                      </div>
                      <div className="flex justify-start items-center mx-2 w-full">
                        <div
                          onClick={() => increaseQuantity({ id })}
                          className="flex justify-center items-center border border-white rounded-[50%] mr-4 text-center h-6 w-6"
                        >
                          +
                        </div>
                        <span className="mr-4">{quantity}</span>
                        <div
                          onClick={() => subtractQuantity({ id })}
                          className="flex justify-center items-center border border-white rounded-[50%] mr-4 text-center h-6 w-6"
                        >
                          -
                        </div>
                      </div>
                      <span
                        className="text-xl mt-auto"
                        onClick={() => removeItem({ id })}
                      >
                        ❌
                      </span>
                    </div>
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
