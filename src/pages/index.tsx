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
  console.log(products.data);
  return (
    <div>
      <p>{hello.data.greeting}</p>

      {productData.map((item) => {
        return (
          <div key={`item-${item.name}`}>
            <span>{item?.name}</span>;
          </div>
        );
      })}
    </div>
  );
}
