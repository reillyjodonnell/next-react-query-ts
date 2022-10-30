import { useState } from 'react';

export default function useCart(list = []) {
  const [items, setItems] = useState(list);

  // const cart = [{title: 'Reilly's first item', id: 0, price: 12}, {title: 'Reilly's second item', id: 1, price: 14}]
  const increaseQuantity = ({ id }) => {
    const updatedArray = items?.map((product) => {
      if (product?.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    const itemsWithQuantity = updatedArray.filter((item) => item.quantity > 0);

    setItems(itemsWithQuantity);
  };

  const removeItem = ({ id }) => {
    const updated = items?.filter((item) => item.id !== id);

    setItems(updated);
  };

  const subtractQuantity = ({ id }) => {
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

  return {
    items,
    setItems,
    addItem,
    subtractQuantity,
    increaseQuantity,
    removeItem,
  };
}
