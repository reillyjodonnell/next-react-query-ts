import { trpc } from '../utils/trpc';
import Cart from '~/components/cart';
import { useEffect, useState } from 'react';
import useCart from '~/hooks/useCart';

export default function IndexPage() {
  const [item, setItem] = useState({});

  const {
    items,
    setItems,
    addItem,
    subtractQuantity,
    increaseQuantity,
    removeItem,
  } = useCart();

  const create = trpc.posts.addItem.useMutation();

  const products = trpc.posts.items.useQuery({ text: 'products' });
  const productData = products?.data?.items ?? [];

  useEffect(() => {
    console.log(products);
  }, [products]);

  const createItem = (e) => {
    e.preventDefault();
    const data = create.mutate({ ...item });
  };

  console.log(create.error);

  // To implement validations check out https://kitchen-sink.trpc.io/react-hook-form?file=feature%2Freact-hook-form%2Findex.tsx#content

  if (!productData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <Header
        subtractQuantity={subtractQuantity}
        increaseQuantity={increaseQuantity}
        removeItem={removeItem}
        setItems={setItems}
        items={items}
      />
      <div className="flex justify-center items-center bg-black flex-col mt-4">
        <span className="flex text-2xl text-white">Store</span>
        <div className="text-white">
          <div className="flex justify-end"></div>
          <div className="flex flex-col justify-center items-center">
            {create?.isLoading ? (
              <span>Loading</span>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <label className="flex flex-col my-2">
                  URL
                  <input
                    className="text-white border-2 rounded-md border-white bg-transparent"
                    onChange={(e) =>
                      setItem({ ...item, url: e?.target?.value })
                    }
                  />
                </label>
                <label className="flex flex-col my-2">
                  Description
                  <input
                    className="text-white border-2 rounded-md border-white bg-transparent"
                    onChange={(e) =>
                      setItem({ ...item, description: e?.target?.value })
                    }
                  />
                </label>
                <label className="flex flex-col my-2">
                  Price
                  <input
                    className="text-white border-2 rounded-md border-white bg-transparent"
                    onChange={(e) =>
                      setItem({ ...item, price: e?.target?.value })
                    }
                  />
                </label>
                {create?.error ? <span>Uh oh!</span> : null}
                <button
                  onClick={(e) => createItem(e)}
                  className="border-2 mx-4 px-2 py-1 rounded-lg border-white"
                >
                  Add Item
                </button>
              </div>
            )}
          </div>
          <div className="grid my-12 grid-cols-3 gap-y-8">
            {productData.map((item) => {
              const formattedPrice = (item.price / 100).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                }
              );
              return (
                <div
                  className="mx-8 flex flex-col justify-center items-center"
                  key={`item-${item.name}`}
                >
                  <img
                    className="w-60 h-60 rounded-lg cursor-pointer object-cover"
                    src={item.image}
                  />
                  <div className="flex w-full mt-2">
                    <div className="flex flex-col justify-start">
                      <span>{formattedPrice}</span>
                      <span>{item?.description}</span>
                    </div>
                    <button
                      onClick={() => {
                        addItem({ item });
                      }}
                      className="flex ml-auto w-fit h-fit py-[2px] px-2 border-2 border-stone-600 rounded-lg transition-all hover:bg-[#0000000c] hover:border-white"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header({
  subtractQuantity,
  increaseQuantity,
  removeItem,
  setItems,
  items,
}) {
  return (
    <header className="w-full h-20 flex text-white justify-start items-center px-20 border-b border-white">
      <span className="font-bold text-2xl cursor-pointer">Plant Shop</span>
      <div className="ml-auto flex">
        <span className="mx-1 cursor-pointer opacity-90 hover:opacity-100 px-6 py-2 hover:bg-[#ffffff14] transition-all rounded-md">
          Home
        </span>
        <span className="mx-1 cursor-pointer opacity-90 hover:opacity-100 px-6 py-2 hover:bg-[#ffffff14] transition-all rounded-md">
          Products
        </span>
        <span className="mx-1 cursor-pointer opacity-90 hover:opacity-100 px-6 py-2 hover:bg-[#ffffff14] transition-all rounded-md">
          Explore
        </span>
        <div className="mx-1 px-2 flex justify-center items-center relative">
          <Cart
            subtractQuantity={subtractQuantity}
            increaseQuantity={increaseQuantity}
            removeItem={removeItem}
            setItems={setItems}
            items={items}
          />
        </div>
      </div>
    </header>
  );
}
