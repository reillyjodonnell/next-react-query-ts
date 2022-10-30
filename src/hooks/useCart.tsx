import { useState } from 'react';

export default function useCart(list = []) {
  const [items, setItems] = useState(list);

  const removeItem = ({ id }) => {
    const updatedArray = items?.map((product) => {
      if (product?.id === id) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    const itemsWithQuantity = updatedArray.filter((item) => item.quantity > 0);

    setItems(itemsWithQuantity);
  };

  const addItem = ({ item }) => {
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
  };

  return { items, setItems, addItem, removeItem };
}
