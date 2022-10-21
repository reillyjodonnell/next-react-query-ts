import { trpc } from '../utils/trpc';
import Cart from '~/components/cart';
import { useState, useCallback, useEffect } from 'react';
export default function IndexPage() {
  const [items, setItems] = useState([]);
  const hello = trpc.posts.hello.useQuery();
  const products = trpc.posts.items.useQuery({ text: 'products' });
  const createItem = trpc.posts.addItem.useMutation();
  const productData = products?.data;

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

  if (!hello.data || !products.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center bg-black">
      <div className="text-white">
        <p>{hello.data}</p>
        <Cart setItems={setItems} items={items} />
        <div className="flex flex-col justify-center items-start">
          <span>Add new item</span>
          <div>
            <input
              placeholder="Add item..."
              className="bg-transparent px-2 py-1 border-2 border-white rounded-lg"
            />
            <button className="border-2 mx-4 px-2 py-1 rounded-lg border-white">
              Add
            </button>
          </div>
        </div>

        <div className="flex ">
          {productData.map((item) => {
            const formattedPrice = (item.price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            });

            return (
              <div
                className="mx-2 flex flex-col justify-center items-center"
                key={`item-${item.name}`}
              >
                <span>{formattedPrice}</span>
                <img className="w-24 h-24" src={item.image} />
                <button
                  onClick={() => {
                    addItem({ item });
                  }}
                  className="flex px-4 py-1 my-2 border-2 border-stone-600 rounded-lg transition-all hover:bg-[#0000000c]"
                >
                  Quick Buy
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
