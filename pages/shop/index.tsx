import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ProductListItem from '../../components/ProductListItem';
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
      <div className="flex w-full h-full py-4 px-4 mx-auto justify-center gap-12 bg-beige/30 text-beige">
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
        <div className="flex gap-2 items-center cursor-pointer text-orange">
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
              <ProductListItem product={product} key={product.id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
