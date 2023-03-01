import React from 'react';
import { useRecoilState } from 'recoil';
import ProductListItem from '../../components/ProductListItem';
import { favoritesState } from '../../state/state';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  return (
    <div className="flex flex-col flex-auto w-full px-4 py-4 mx-auto max-w-7xl">
      <span className="text-xl font-medium text-beige">관심 상품</span>
      {favorites.length > 0 ? (
        <div className="grid w-full grid-cols-12 gap-6 flex-auto py-4">
          {favorites.map((product) => (
            <ProductListItem product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-auto items-center justify-center w-full p-12 col-span-12 text-beige">관심 상품이 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default FavoritesPage;
