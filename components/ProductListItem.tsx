import React from 'react';
import { priceComma } from '../utils/priceComma';

const ProductListItem = ({ product }: { product: { id: number; productName: string; size: string | null; price: number } }) => {
  return (
    <div className="flex flex-col items-center w-full col-span-3 gap-0.5">
      <div className="w-full after:pb-[100%] bg-mint flex justify-center items-center ">
        <span className="text-3xl font-semibold text-orange">IMAGE</span>
      </div>
      <span className="w-full font-medium text-beige">
        {product.productName} {product.size ? `(${product.size})` : ''}
      </span>
      <span className="w-full text-ocher font-medium">{priceComma(product.price)}원</span>
    </div>
  );
};

export default ProductListItem;
