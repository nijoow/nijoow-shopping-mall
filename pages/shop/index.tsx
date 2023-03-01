import { motion } from 'framer-motion';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ProductListItem from '../../components/ProductListItem';
import { clothesData } from '../../data/data';

const BEST = 'Best';
const NEWEST = 'Newest';
const LOW_TO_HIGH = 'LowToHigh';
const HIGH_TO_HIGH = 'HighToLow';

const filterStatus = {
  Best: '추천순',
  Newest: '최신순',
  LowToHigh: '낮은 가격순',
  HighToLow: '높은 가격순',
};

const ShopPage: NextPage = () => {
  const [clothesList, setClothesList] = useState([...clothesData]);
  const [category, setCategory] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<'Best' | 'Newest' | 'HighToLow' | 'LowToHigh'>(BEST);

  useEffect(() => {
    switch (filter) {
      case BEST:
        setClothesList([...clothesData]);
        break;
      case NEWEST:
        setClothesList([...clothesData].reverse());
        break;
      case LOW_TO_HIGH:
        setClothesList([...clothesData].sort((a, b) => a.price - b.price));
        break;
      case HIGH_TO_HIGH:
        setClothesList([...clothesData].sort((a, b) => b.price - a.price));
        break;
    }
  }, [filter]);

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
        <div className="relative flex items-center gap-2 cursor-pointer text-ocher" onClick={() => setOpenFilter(!openFilter)}>
          <span>{filterStatus[filter]}</span>
          <AiFillCaretDown />
          <motion.div
            variants={{ visible: { opacity: 1, scale: 1, translateY: 4 }, hidden: { opacity: 0, scale: 0.5, originY: 0 } }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            animate={openFilter ? 'visible' : 'hidden'}
            className="absolute z-20 flex flex-col gap-2 p-4 rounded-lg shadow-md min-w-max -right-1 top-full bg-brown/95 text-beige bg-blend-multiply bg-texture"
          >
            <button type="button" className="mx-auto w-fit" onClick={() => setFilter(BEST)}>
              {filterStatus[BEST]}
            </button>
            <button type="button" className="mx-auto w-fit" onClick={() => setFilter(NEWEST)}>
              {filterStatus[NEWEST]}
            </button>
            <button type="button" className="mx-auto w-fit" onClick={() => setFilter(LOW_TO_HIGH)}>
              {filterStatus[LOW_TO_HIGH]}
            </button>
            <button type="button" className="mx-auto w-fit" onClick={() => setFilter(HIGH_TO_HIGH)}>
              {filterStatus[HIGH_TO_HIGH]}
            </button>
          </motion.div>
        </div>
      </div>
      <div className="flex w-full h-full gap-4 px-4 pb-12 mx-auto max-w-7xl">
        <div className="grid w-full grid-cols-12 gap-6">
          {' '}
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
