import { useEffect, useState } from 'react';
import { Product } from './interfaces';
export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    async function retrieve() {
      const products = await (await fetch('/api/plants')).json();
      setData([...products]);
    }
    retrieve();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="bg-[#283044] w-full h-full min-h-full flex justify-center items-center">
      <span className="text-2xl font-bold text-white">
        Home of <span className="text-green-600">Monsteras</span> ❤️ 🌱
      </span>
      <div className="flex flex-col justify-center items-center">
        {data ? (
          data.map((item) => {
            return <span className="text-white">{item.name}</span>;
          })
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}
