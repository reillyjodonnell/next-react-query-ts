import { trpc } from '../utils/trpc';
import Cart from '~/components/cart';
import { useState, useCallback, useEffect } from 'react';
export default function IndexPage() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  const products = trpc.posts.items.useQuery({ text: 'products' });
  const create = trpc.posts.addItem.useMutation();
  const productData = products?.data;

  const createItem = () => {
    create.mutate({ text: itemName });
  };

  const addItem = useCallback(
    ({ item }) => {
      const dupe = items?.find((prod) => prod?.id === item.id);
      const updatedArray = items?.map((product) => {
        if (product?.id === item?.id) {
          return { ...product, quantity: product.quantity + 1 };
        } else return product;
      });
      if (dupe) {
        setItems([...updatedArray]);
      } else {
        setItems([...updatedArray, { ...item, quantity: 1 }]);
      }
    },
    [items]
  );

  if (!products.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center bg-black flex-col mt-4">
      <span className="flex text-2xl text-white">Store Example</span>
      <div className="text-white">
        <div className="flex justify-end">
          <Cart setItems={setItems} items={items} />
        </div>

        <div className="flex flex-col justify-center items-start">
          <span>Add new item</span>
          <div>
            <input
              onChange={(e) => setItemName(e.target?.value)}
              placeholder="Add item..."
              className="bg-transparent px-2 py-1 border-2 border-white rounded-lg"
            />
            <button
              onClick={createItem}
              className="border-2 mx-4 px-2 py-1 rounded-lg border-white"
            >
              Add
            </button>
          </div>
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
                <img className="w-60 h-60 rounded-lg" src={item.image} />
                <div className="flex w-full mt-2">
                  <div className="flex flex-col justify-start">
                    <span>{formattedPrice}</span>

                    <span>{item?.description}</span>
                  </div>
                  <button
                    onClick={() => {
                      addItem({ item });
                    }}
                    className="flex ml-auto w-fit h-fit p-[2px] border-2 border-stone-600 rounded-lg transition-all hover:bg-[#0000000c] hover:border-white"
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
