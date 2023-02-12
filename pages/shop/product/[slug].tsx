import { InferGetStaticPropsType } from 'next/types';
import React from 'react';
import { clothesData } from '../../../data/data';
import { priceComma } from '../../../utils/priceComma';

export const getStaticPaths = async () => {
  const paths = clothesData.map((data) => ({ params: { slug: data.id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const product = clothesData.find((data) => data.id === Number(params.slug));
  return {
    props: { product },
  };
};
const Product = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(product);
  return (
    <div className="flex w-full h-full gap-4 px-4 py-8 mx-auto max-w-7xl pb-12">
      <div className="w-full after:pb-[100%] bg-mint flex justify-center items-center ">
        <span className="text-3xl font-semibold text-orange">IMAGE</span>
      </div>
      <div className="w-full flex flex-col justify-center">
        <span className="w-full font-medium text-beige text-3xl">{product?.productName}</span>
        <span className="w-full font-medium text-beige">{product?.size ? `(${product.size})` : ''}</span>
        <span className="w-full text-ocher font-medium text-2 xl">{product && priceComma(product.price)}원</span>
      </div>
    </div>
  );
};

export default Product;
