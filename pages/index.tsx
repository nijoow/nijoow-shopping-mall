import { NextPage } from 'next';
import Image from 'next/image';
import { clothesData } from '../data/data';
import ProductListItem from '../components/ProductListItem';
import { getPlaiceholder } from 'plaiceholder';

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder('/banner.jpg', { size: 10 });
  return {
    props: { blurDataURL: base64 },
  };
};

const Home = ({ blurDataURL }: { blurDataURL: string }) => {
  return (
    <>
      <div className="relative w-full h-full min-h-screen">
        <Image src={'/banner.jpg'} alt="banner" fill placeholder="blur" blurDataURL={blurDataURL} className="object-cover object-[0,40%] aspect-auto" />
        <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full text-white">
          <span className="z-20 text-8xl font-Insomnia text-beige">nijoow vintage</span>
          <span className="absolute z-10 translate-x-1 translate-y-1 text-brown/80 text-8xl font-Insomnia">nijoow vintage</span>
          <span className="absolute z-0 text-black translate-x-2 translate-y-2 text-8xl font-Insomnia">nijoow vintage</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-6 py-6 mx-auto max-w-7xl">
        <div className="col-span-12">
          <span className="text-2xl font-semibold text-beige">최신 업로드</span>
        </div>
        {clothesData.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
