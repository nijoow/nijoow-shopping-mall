import { NextPage } from 'next';
import React, { useState } from 'react';
import ProductListItem from '../../components/ProductListItem';
import { Categories } from '../../components/shop/Categories';
import Filter from '../../components/shop/Filter';
import { clothesData } from '../../data/data';
import { Category } from '../../types/types';

const ShopPage: NextPage = () => {
  const [clothesList, setClothesList] = useState([...clothesData]);
  const [category, setCategory] = useState<Category>('');

  return (
    <>
      <Categories category={category} setCategory={setCategory} />
      <div className="flex items-center justify-end w-full p-4 mx-auto max-w-7xl">
        <Filter setClothesList={setClothesList} />
      </div>
      <div className="flex w-full h-full gap-4 px-4 pb-12 mx-auto max-w-7xl">
        <div className="grid w-full grid-cols-4 gap-4 md:gap-6">
          {clothesList
            .filter((value) => value.category.includes(category))
            .map((product) => (
              <ProductListItem product={product} key={product.id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
