import Link from 'next/link';
import { InferGetStaticPropsType } from 'next/types';
import React, { useRef } from 'react';
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
  const sectionRef = useRef<null[] | HTMLDivElement[]>([]);
  const moveToSection = (index: number) => {
    window.scrollTo({
      top: sectionRef.current[index]?.offsetTop,
      behavior: 'smooth',
    });
  };
  return (
    <div className="flex flex-col w-full h-full py-8 mx-auto gap-24 max-w-7xl">
      <div className="flex w-full h-full gap-8 justify-evenly">
        <div className="w-full after:pb-[100%] bg-mint flex justify-center items-center max-w-2xl">
          <span className="text-3xl font-semibold text-orange">IMAGE</span>
        </div>
        <div className="w-full flex flex-col justify-center max-w-lg gap-4">
          <div className="w-full border-t-2 border-orange mb-auto"></div>
          <span className="w-full font-medium text-beige text-4xl">
            {product?.productName} {product?.size ? `(${product.size})` : ''}
          </span>{' '}
          <span className="w-full text-ocher font-medium text-3xl">{product && priceComma(product.price)}원</span>
          <div className="w-full flex">
            <span className="text-beige">상품 간단 설명</span>
          </div>
          <div className="w-full flex gap-20">
            <span className="text-beige">적립금</span>
            <span className="text-beige">{product && priceComma(product.price * 0.01)}원 (1%)</span>
          </div>
          <div className="w-full flex gap-20">
            <span className="text-beige">배송비</span>
            <span className="text-beige">
              {priceComma(3000)}원 ({priceComma(50000)}원 이상 구매시 무료)
            </span>
          </div>
          <div className="w-full border-t-2 border-orange mt-auto"></div>
          <div className="w-full flex justify-between py-3">
            <span className="font-medium text-xl text-beige">총 상품금액</span>{' '}
            <span className="font-medium text-xl text-ocher">{product && priceComma(product.price)}원</span>
          </div>{' '}
          <button className="w-full p-5 bg-orange border-2 font-medium border-orange flex rounded-sm items-center justify-center text-brown" type="button">
            바로 구매
          </button>
          <div className="w-full flex gap-2 ">
            <button className="w-full p-5 border-orange border-2 font-medium flex rounded-sm items-center justify-center text-orange" type="button">
              장바구니 담기
            </button>
            <button className="w-full p-5 border-orange border-2 font-medium flex rounded-sm items-center justify-center text-orange" type="button">
              관심상품 등록
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex border-b-2 justify-center border-orange" ref={(element) => (sectionRef.current[0] = element)}>
        <button
          type="button"
          className="w-fullp-4 px-8 flex items-center justify-center border-2 translate-y-0.5 translate-x-0.5 text-beige border-orange bg-orange"
          onClick={() => moveToSection(0)}
        >
          상품정보
        </button>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 border-orange text-orange"
          onClick={() => moveToSection(1)}
        >
          결제/교환/배송정보
        </button>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 -translate-x-0.5 border-orange text-orange"
          onClick={() => moveToSection(2)}
        >
          상품문의 (0)
        </button>
      </div>
      <div className="h-[600px] w-full flex items-center justify-center text-mint">상품정보</div>
      <div className="w-full flex border-b-2 justify-center border-orange" ref={(element) => (sectionRef.current[1] = element)}>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 translate-x-0.5 text-orange border-orange"
          onClick={() => moveToSection(0)}
        >
          상품정보
        </button>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 text-beige border-orange bg-orange"
          onClick={() => moveToSection(1)}
        >
          결제/교환/배송정보
        </button>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 -translate-x-0.5 border-orange text-orange"
          onClick={() => moveToSection(2)}
        >
          상품문의 (0)
        </button>
      </div>
      <div className="h-[600px] w-full flex items-center justify-center text-mint"> 결제/교환/배송정보</div>

      <div className="w-full flex border-b-2 justify-center border-orange" ref={(element) => (sectionRef.current[2] = element)}>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 translate-x-0.5 text-orange border-orange"
          onClick={() => moveToSection(0)}
        >
          상품정보
        </button>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 border-orange text-orange"
          onClick={() => moveToSection(1)}
        >
          결제/교환/배송정보
        </button>
        <button
          type="button"
          className="p-4 px-8 flex items-center justify-center border-2 translate-y-0.5 -translate-x-0.5 text-beige border-orange bg-orange"
          onClick={() => moveToSection(2)}
        >
          상품문의 (0)
        </button>
      </div>
      <div className="h-[600px] w-full flex items-center justify-center text-mint"> 상품문의</div>
    </div>
  );
};

export default Product;
