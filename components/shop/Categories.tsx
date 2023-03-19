import React from 'react';
import { Category } from '../../types/types';

export const Categories = ({ category, setCategory }: { category: Category; setCategory: React.Dispatch<React.SetStateAction<Category>> }) => {
  return (
    <div className="flex md:justify-center w-full h-full gap-12 px-4 py-4 mx-auto bg-beige/30 text-beige overflow-auto">
      <span className={`cursor-pointer  min-w-fit ${category === '' ? 'font-medium text-mint' : 'font-normal text-beige'}`} onClick={() => setCategory('')}>
        전체 상품
      </span>
      <span
        className={`cursor-pointer min-w-fit ${category === 'Outer' ? 'font-medium text-mint' : 'font-normal text-beige'}`}
        onClick={() => setCategory('Outer')}
      >
        아우터
      </span>
      <span
        className={`cursor-pointer min-w-fit ${category === 'Top' ? 'font-medium text-mint' : 'font-normal text-beige'}`}
        onClick={() => setCategory('Top')}
      >
        상의
      </span>
      <span
        className={`cursor-pointer min-w-fit ${category === 'Bottom' ? 'font-medium text-mint' : 'font-normal text-beige'}`}
        onClick={() => setCategory('Bottom')}
      >
        하의
      </span>
      <span
        className={`cursor-pointer min-w-fit ${category === 'Acc' ? 'font-medium text-mint' : 'font-normal text-beige'}`}
        onClick={() => setCategory('Acc')}
      >
        악세사리
      </span>
    </div>
  );
};
