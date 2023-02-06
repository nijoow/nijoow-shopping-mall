import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { clothesData } from '../../data/data';
import { priceComma } from '../../utils/priceComma';

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Shop = () => {
  const [category, setCategory] = useState('');
  // useEffect(()=>{

  // },[])
  return (
    <>
      <div className="flex w-full h-full py-4 px-4 mx-auto justify-center gap-12 bg-brown/70 text-beige">
        <span className={`cursor-pointer  ${category === '' ? 'font-medium text-mint' : 'font-normal text-beige'}`} onClick={() => setCategory('')}>
          전체 상품
        </span>
        <span className={`cursor-pointer ${category === 'Outer' ? 'font-medium text-mint' : 'font-normal text-beige'}`} onClick={() => setCategory('Outer')}>
          아우터
        </span>
        <span className={`cursor-pointer ${category === 'Top' ? 'font-medium text-mint' : 'font-normal text-beige'}`} onClick={() => setCategory('Top')}>
          상의
        </span>
        <span className={`cursor-pointer ${category === 'Bottom' ? 'font-medium text-mint' : 'font-normal text-beige'}`} onClick={() => setCategory('Bottom')}>
          하의
        </span>
        <span className={`cursor-pointer ${category === 'Acc' ? 'font-medium text-mint' : 'font-normal text-beige'}`} onClick={() => setCategory('Acc')}>
          악세사리
        </span>
      </div>
      <div className="justify-end items-center flex w-full p-4 max-w-7xl mx-auto">
        <div className="flex gap-2 items-center cursor-pointer">
          <span>정렬기준</span>
          <AiFillCaretDown />
        </div>
      </div>
      <div className="flex w-full h-full gap-4 px-4 mx-auto max-w-7xl pb-12">
        {/* <div className="h-full w-48 flex flex-col gap-2">
          <span>필터</span>
        </div> */}
        <div className="grid grid-cols-12 w-full gap-6">
          {' '}
          {clothesData
            .filter((value) => value.category.includes(category))
            .map((product) => (
              <div className="flex flex-col items-center w-full col-span-3 gap-0.5" key={product.id}>
                <div className="w-full after:pb-[100%] bg-mint flex justify-center items-center">
                  <span className="text-3xl font-semibold text-orange">IMAGE</span>
                </div>
                <span className="w-full font-medium text-brown">
                  {product.productName} {product.size ? `(${product.size})` : ''}
                </span>
                <span className="w-full text-orange font-semibold">{priceComma(product.price)}원</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
