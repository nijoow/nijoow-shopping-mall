import Link from 'next/link';
import { InferGetStaticPropsType } from 'next/types';
import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { clothesData } from '../../../data/data';
import { cartState } from '../../../state/cart';
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
  const [cart, setCart] = useRecoilState(cartState);
  const sectionRef = useRef<null[] | HTMLDivElement[]>([]);

  const moveToSection = (index: number) => {
    window.scrollTo({
      top: sectionRef.current[index]?.offsetTop,
      behavior: 'smooth',
    });
  };

  const addCart = (productId: number) => {
    if (cart.find((item) => item.id === productId)) {
      alert('이미 장바구니에 존재하는 상품입니다');
      return;
    }
    product && setCart([...cart, product]);
  };

  return (
    <div className="flex flex-col w-full h-full gap-24 py-8 mx-auto max-w-7xl">
      <div className="flex w-full h-full gap-8 justify-evenly">
        <div className="w-full after:pb-[100%] bg-mint flex justify-center items-center max-w-2xl">
          <span className="text-3xl font-semibold text-orange">IMAGE</span>
        </div>
        <div className="flex flex-col justify-center w-full max-w-lg gap-4">
          <div className="w-full mb-auto border-t-2 border-orange"></div>
          <span className="w-full text-4xl font-medium text-beige">
            {product?.productName} {product?.size ? `(${product.size})` : ''}
          </span>{' '}
          <span className="w-full text-3xl font-medium text-ocher">{product && priceComma(product.price)}원</span>
          <div className="flex w-full">
            <span className="text-beige">상품 간단 설명</span>
          </div>
          <div className="flex w-full gap-20">
            <span className="text-beige">적립금</span>
            <span className="text-beige">{product && priceComma(product.price * 0.01)}원 (1%)</span>
          </div>
          <div className="flex w-full gap-20">
            <span className="text-beige">배송비</span>
            <span className="text-beige">
              {priceComma(3000)}원 ({priceComma(50000)}원 이상 구매시 무료)
            </span>
          </div>
          <div className="w-full mt-auto border-t-2 border-orange"></div>
          <div className="flex justify-between w-full py-3">
            <span className="text-xl font-medium text-beige">총 상품금액</span>{' '}
            <span className="text-xl font-medium text-ocher">{product && priceComma(product.price)}원</span>
          </div>{' '}
          <button className="flex items-center justify-center w-full p-5 font-medium border-2 rounded-sm bg-orange border-orange text-brown" type="button">
            바로 구매
          </button>
          <div className="flex w-full gap-2 ">
            <button
              className="flex items-center justify-center w-full p-5 font-medium border-2 rounded-sm border-orange text-orange"
              type="button"
              onClick={() => product && addCart(product.id)}
            >
              장바구니 담기
            </button>
            <button className="flex items-center justify-center w-full p-5 font-medium border-2 rounded-sm border-orange text-orange" type="button">
              관심상품 등록
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full border-b-2 border-orange" ref={(element) => (sectionRef.current[0] = element)}>
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
      <div className="flex justify-center w-full border-b-2 border-orange" ref={(element) => (sectionRef.current[1] = element)}>
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

      <div className="flex justify-center w-full border-b-2 border-orange" ref={(element) => (sectionRef.current[2] = element)}>
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
