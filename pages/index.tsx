import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useEffect } from 'react';
import Image from 'next/image';
const Home: NextPage = () => {
  return (
    <>
      <div className="relative w-full h-full min-h-screen">
        <Image src={'/banner.jpg'} alt="banner" fill className="object-cover object-[0,40%] aspect-auto" />
        <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full text-white">
          <span className="z-20 text-8xl font-Insomnia text-beige">nijoow vintage</span>
          <span className="absolute z-10 translate-x-1 translate-y-1 text-brown/80 text-8xl font-Insomnia">nijoow vintage</span>
          <span className="absolute z-0 text-black translate-x-2 translate-y-2 text-8xl font-Insomnia">nijoow vintage</span>
        </div>
      </div>{' '}
      <div className="grid w-full grid-cols-12 gap-6 max-w-7xl mx-auto py-6">
        <div className="col-span-12">
          <span className="text-2xl font-medium">최신 업로드</span>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => (
          <div className="flex flex-col items-center w-full col-span-3" key={value}>
            <div className="w-full after:pb-[100%] bg-gray-200 flex justify-center items-center">
              <span className="text-3xl font-semibold">IMAGE</span>
            </div>
            <span className="w-full">상품명 {value}</span>
            <span className="w-full">10,000원</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
