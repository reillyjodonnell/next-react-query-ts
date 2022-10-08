// import { GetServerSideProps } from 'next';
// import { useEffect, useState } from 'react';
// import prisma from '~/lib/prisma';
// import { Product } from './interfaces';

// export async function getServerSideProps({ context }) {
//   const products = await prisma.product.findMany();
//   return {
//     props: {
//       products,
//     },
//   };
// }

// export default function Home({ products }) {
//   console.log("Here's the data from getServerSideProps");
//   console.log(products);

//   // const [data, setData] = useState<Product[]>(products);
//   // useEffect(() => {
//   //   async function retrieve() {
//   //     const products = await (await fetch('/api/plants')).json();
//   //     setData([...products]);
//   //   }
//   //   retrieve();
//   // }, []);

//   // useEffect(() => {
//   //   console.log(data);
//   // }, [data]);

//   return (
//     <div className="bg-[#283044] w-full h-full min-h-full flex justify-center items-center">
//       <span className="text-2xl font-bold text-white">
//         Home of <span className="text-green-600">Monsteras</span> ❤️ 🌱
//       </span>
//       <div className="flex flex-col justify-center items-center">
//         {products ? (
//           products?.map(({ name }) => {
//             return (
//               <span key={name} className="text-white">
//                 {name}
//               </span>
//             );
//           })
//         ) : (
//           <span>Loading...</span>
//         )}
//       </div>
//     </div>
//   );
// }

import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  const products = trpc.items.useQuery({ text: 'products' });
  if (!hello.data || !products.data) {
    return <div>Loading...</div>;
  }
  const productData = products?.data;
  return (
    <div className="flex justify-center items-center bg-black">
      <div className="text-white">
        <p>{hello.data.greeting}</p>
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
                <button className="flex px-4 py-1 my-2 border-2 border-stone-600 rounded-lg transition-all hover:bg-[#0000000c]">
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
