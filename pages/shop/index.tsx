import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ProductListItem from '../../components/ProductListItem';
import { clothesData } from '../../data/data';
import { priceComma } from '../../utils/priceComma';

const Shop = () => {
  const [category, setCategory] = useState('');
  // useEffect(()=>{

  // },[])
  return (
    <>
      <div className="flex justify-center w-full h-full gap-12 px-4 py-4 mx-auto bg-beige/30 text-beige">
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
      <div className="flex items-center justify-end w-full p-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-2 cursor-pointer text-orange">
          <span>정렬기준</span>
          <AiFillCaretDown />
        </div>
      </div>
      <div className="flex w-full h-full gap-4 px-4 pb-12 mx-auto max-w-7xl">
        {/* <div className="flex flex-col w-48 h-full gap-2">
          <span>필터</span>
        </div> */}
        <div className="grid w-full grid-cols-12 gap-6">
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
