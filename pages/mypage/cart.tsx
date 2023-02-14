import React from 'react';
import ProductListItem from '../../components/ProductListItem';
import { clothesData } from '../../data/data';

const Cart = () => {
  return (
    <>
      <div className="flex w-full px-4 py-4 mx-auto max-w-7xl">
        <span className="text-xl font-medium text-beige">장바구니</span>
      </div>
      <div className="flex grid w-full h-full grid-cols-12 gap-4 px-4 pb-12 mx-auto max-w-7xl">
        {clothesData.length > 0 ? clothesData.map((product) => <ProductListItem product={product} key={product.id} />) : <div>장바구니가 비었습니다</div>}
      </div>
    </>
  );
};

export default Cart;
