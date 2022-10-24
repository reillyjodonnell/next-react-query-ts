import { trpc } from '../utils/trpc';
import Cart from '~/components/cart';
import { useState, useCallback, useEffect } from 'react';
import useCart from '~/hooks/useCart';
export default function IndexPage() {
  const [itemName, setItemName] = useState('');
  const [item, setItem] = useState({});
  const { items, setItems, addItem } = useCart();

  const products = trpc.posts.items.useQuery({ text: 'products' });
  const create = trpc.posts.addItem.useMutation();
  const productData = products?.data;

  const createItem = () => {
    const data = create.mutate({ ...item });
    console.log(data);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center bg-black flex-col mt-4">
      <span className="flex text-2xl text-white">Store Example</span>
      <div className="text-white">
        <div className="flex justify-end">
          <Cart setItems={setItems} items={items} />
        </div>
        <div className="flex flex-col justify-center items-center">
          {create?.isLoading ? (
            <span>Loading</span>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <label className="flex flex-col my-2">
                URL
                <input
                  className="text-black"
                  onChange={(e) => setItem({ ...item, url: e?.target?.value })}
                />
              </label>
              <label className="flex flex-col my-2">
                Description
                <input
                  className="text-black"
                  onChange={(e) =>
                    setItem({ ...item, description: e?.target?.value })
                  }
                />
              </label>
              <label className="flex flex-col my-2">
                Price
                <input
                  className="text-black"
                  onChange={(e) =>
                    setItem({ ...item, price: e?.target?.value })
                  }
                />
              </label>
              {create?.error ? <span>Uh oh!</span> : null}
              <button
                onClick={createItem}
                className="border-2 mx-4 px-2 py-1 rounded-lg border-white"
              >
                Add Item
              </button>
            </div>
          )}
        </div>
        <div className="flex my-12 ">
          {productData.map((item) => {
            const formattedPrice = (item.price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            });
            return (
              <div
                className="mx-8 flex flex-col justify-center items-center"
                key={`item-${item.name}`}
              >
                <img
                  className="w-60 h-60 rounded-lg cursor-pointer"
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
  );
}
