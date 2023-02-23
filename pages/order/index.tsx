import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../state/cart';
import { priceComma } from '../../utils/priceComma';

const OrderPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex flex-col flex-auto w-full gap-4 px-4 py-4 mx-auto max-w-7xl">
      <table className="table w-full table-auto text-beige ">
        <thead>
          <tr className="border-y border-ocher">
            <th className="py-3 pr-3">전체 ({cart.length}개)</th>
            {['상품명(옵션)', '상품번호', '판매가격', '적립금', '주문관리', '배송비'].map((element) => (
              <th className="p-3" key={element}>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 &&
            cart
              .filter((item) => id?.includes(item.id.toString()))
              .map((product, index) => (
                <tr key={product.id} className="border-b border-ocher/50">
                  {' '}
                  <td className="py-3 pr-3">
                    <div className="flex items-center justify-center">{index + 1}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-24 h-24 font-semibold cursor-pointer bg-mint text-orange">상품이미지</div>
                      <div className="flex flex-col flex-auto h-full gap-2 my-auto">
                        <span className="font-medium cursor-pointer">{product.productName}</span>
                        <span className="text-ocher">{product.size}</span>
                      </div>
                    </div>
                  </td>{' '}
                  <td className="p-3">
                    <div className="flex items-center justify-center cursor-pointer">{product.id}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center text-beige">{priceComma(product.price)}원</div>
                  </td>{' '}
                  <td className="p-3">
                    <div className="flex items-center justify-center text-beige">{product && priceComma(product.price * 0.01)}원 (1%)</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center">3,000원</div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
