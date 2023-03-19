import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../state/state';
import { priceComma } from '../../utils/priceComma';
import { AiOutlineClose } from 'react-icons/ai';

const CartsPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [selected, setSelected] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (cart.length > 0 && cart.length === selected.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [cart, selected]);

  const selectItem = (value: number, isChecked: boolean) => {
    if (isChecked) {
      setSelected([...selected, value]);
    } else {
      setSelected([...selected.filter((item) => item !== value)]);
    }
  };

  const selectAllItem = () => {
    if (!allSelected) {
      setSelected([...cart.map((item) => item.id)]);
    } else {
      setSelected([]);
    }
  };

  const deleteCart = (targetIdList: number[]) => {
    setCart([...cart.filter((item) => !targetIdList.includes(item.id))]);
  };

  const deleteSelectedCart = () => {
    deleteCart(selected);
  };

  return (
    <div className="flex flex-col flex-auto w-full gap-4 px-4 py-4 mx-auto max-w-7xl">
      <span className="text-xl font-medium text-beige">장바구니</span>
      <table className="md:table w-full table-auto text-beige hidden">
        <thead>
          <tr className="border-y border-ocher">
            <th className="p-3">
              <input
                name="all"
                id="all"
                type="checkbox"
                checked={allSelected}
                onChange={() => selectAllItem()}
                className="w-4 h-4 rounded-sm cursor-pointer bg-beige checked:text-mint focus:ring-0 focus:ring-offset-0"
              />
            </th>
            <th className="py-3 pr-3">전체 ({cart.length}개)</th>
            {['상품명(옵션)', '상품번호', '판매가격', '적립금', '주문관리', '배송비'].map((element) => (
              <th className="p-3" key={element}>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <tr key={product.id} className="border-b border-ocher/50">
                {' '}
                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      value={product.id}
                      checked={selected.includes(product.id)}
                      onChange={(e) => selectItem(Number(e.target.value), e.target.checked)}
                      className="w-4 h-4 rounded-sm cursor-pointer bg-beige checked:text-mint focus:ring-0 focus:ring-offset-0"
                    />
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <div className="flex items-center justify-center">{index + 1}</div>
                </td>
                <td className="p-3">
                  <Link href={`/shop/product/${product.id}`} className="flex gap-4">
                    <div className="flex items-center justify-center w-24 h-24 font-semibold cursor-pointer bg-mint text-orange">상품이미지</div>
                    <div className="flex flex-col flex-auto h-full gap-2 my-auto">
                      <span className="font-medium cursor-pointer">{product.productName}</span>
                      <span className="text-ocher">{product.size}</span>
                    </div>
                  </Link>
                </td>{' '}
                <td className="p-3">
                  <Link href={`/shop/product/${product.id}`} className="flex items-center justify-center cursor-pointer">
                    {product.id}
                  </Link>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center text-beige">{priceComma(product.price)}원</div>
                </td>{' '}
                <td className="p-3">
                  <div className="flex items-center justify-center text-beige">{product && priceComma(product.price * 0.01)}원 (1%)</div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <button className="px-4 py-1 rounded-md bg-beige text-orange" type="button" onClick={() => deleteCart([product.id])}>
                      삭제
                    </button>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center">3,000원</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-3" colSpan={8}>
                <div className="flex items-center justify-center w-full p-12 text-beige">장바구니가 비었습니다.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>{' '}
      <div className="md:hidden w-full flex flex-col border-t border-ocher/50">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div key={product.id} className="w-full flex-col gap-1 flex relative py-3 border-b border-ocher/50">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  value={product.id}
                  checked={selected.includes(product.id)}
                  onChange={(e) => selectItem(Number(e.target.value), e.target.checked)}
                  className="w-4 h-4 rounded-sm my-1 cursor-pointer bg-beige checked:text-mint focus:ring-0 focus:ring-offset-0"
                />
                <Link href={`/shop/product/${product.id}`} className="flex gap-4">
                  <div className="flex items-center justify-center w-24 h-24 font-semibold cursor-pointer bg-mint text-orange">상품이미지</div>

                  <div className="flex flex-col flex-auto h-full gap-1 my-auto">
                    <span className="font-medium cursor-pointer text-beige">{product.productName}</span>
                    <span className="text-ocher">{product.size}</span>
                    <span className="text-beige">{product.id}</span>
                  </div>
                </Link>
              </div>
              <div className="flex px-1 ml-6 justify-between text-beige">
                <span>적립금</span>
                <span className="flex items-center justify-center">{product && priceComma(product.price * 0.01)}원 (1%)</span>
              </div>
              <div className="flex ml-6 px-1 justify-between text-beige">
                <span>판매 가격</span>
                <span className="flex items-center justify-center">{priceComma(product.price)}원</span>
              </div>

              <button className="absolute right-3 top-3 text-orange" type="button" onClick={() => deleteCart([product.id])}>
                <AiOutlineClose size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full p-12 text-beige">장바구니가 비었습니다.</div>
        )}
      </div>
      {cart.length > 0 && (
        <button type="button" className="px-4 py-2 rounded-md bg-beige text-orange max-w-fit" onClick={() => deleteSelectedCart()}>
          선택 삭제
        </button>
      )}
      <div className="flex-auto"></div>
      <button
        type="button"
        className="p-4 w-full mx-auto text-lg font-medium rounded-md bg-orange text-beige max-w-xs"
        onClick={() => {
          if (selected.length === 0) {
            alert('주문할 상품을 선택해주세요');
            return;
          }
          router.push({ pathname: '/order', query: { id: selected } });
        }}
      >
        주문하기{' '}
      </button>{' '}
    </div>
  );
};

export default CartsPage;
