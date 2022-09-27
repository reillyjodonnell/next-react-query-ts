import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-[#283044] w-full h-full min-h-full flex justify-center items-center">
      <span className="text-2xl font-bold text-white">
        Home of <span className="text-green-600">Monsteras</span> ❤️ 🌱
      </span>
    </div>
  );
}
