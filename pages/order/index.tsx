import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../state/cart';
import { Product } from '../../types/types';
import { priceComma } from '../../utils/priceComma';

interface TotapProps {
  totalPrice: number | null;
  totalPoint: number | null;
  totalDeliveryFee: number;
  totalPayment: number | null;
}

const OrderPage = () => {
  const [cart] = useRecoilState(cartState);
  const router = useRouter();
  const { id } = router.query;
  const filteredCart = cart.filter((item) => id?.includes(item.id.toString()));

  const [orderlist, setOrderList] = useState<Product[]>([]);
  const [total, setTotal] = useState<TotapProps>({
    totalPrice: null,
    totalPoint: null,
    totalDeliveryFee: 3000,
    totalPayment: null,
  });

  useEffect(() => {
    const totalPrice = filteredCart.reduce((total, item) => total + item.price, 0);
    const totalPoint = totalPrice * 0.01;
    const totalPayment = totalPrice + total.totalDeliveryFee;
    setOrderList([...filteredCart]);
    setTotal({
      ...total,
      totalPrice,
      totalPoint,
      totalPayment,
    });
  }, [id]);

  return (
    <div className="flex flex-col flex-auto w-full gap-4 px-4 py-4 mx-auto max-w-7xl">
      <span className="text-xl font-medium text-beige">상품정보</span>
      <table className="table w-full table-auto text-beige ">
        <thead>
          <tr className="border-y border-ocher">
            <th className="py-3 pr-3">전체 ({cart.length}개)</th>
            {['상품명(옵션)', '상품번호', '판매가격', '적립금', '배송비'].map((element) => (
              <th className="p-3" key={element}>
                {element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderlist.length > 0 ? (
            orderlist.map((product, index) => (
              <tr key={product.id} className="border-b border-ocher/50">
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
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center cursor-pointer">{product.id}</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center text-beige">{priceComma(product.price)}원</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center text-beige">{product && priceComma(product.price * 0.01)}원 (1%)</div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col items-center justify-center">
                    {index > 0 ? (
                      <>
                        <span className="line-through opacity-80">3,000원</span>
                        <span>0원</span>
                      </>
                    ) : (
                      <span>3,000원</span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-3" colSpan={6}>
                <div className="flex items-center justify-center w-full p-12 text-beige">결제할 상품이 없습니다.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="py-2"></div>
      <span className="text-xl font-medium text-beige">쿠폰/할인/적립금</span>
      <div className="grid grid-cols-12 border text-beige border-ocher">
        <div className="col-span-2 px-4 py-2">총 상품 금액</div>
        <div className="col-span-7 px-4 py-2">{total.totalPrice && priceComma(total.totalPrice)} 원</div>
        <div className="flex justify-between col-span-3 px-4 py-2 font-medium bg-mint text-brown ">
          <span>총 상품 금액</span>
          <span>{total.totalPrice && priceComma(total.totalPrice)} 원</span>
        </div>
        <div className="col-span-12 border-b border-ocher/50"></div>

        <div className="col-span-2 px-4 py-2">적립금 선할인</div>
        <div className="col-span-7 px-4 py-2"> 0 원 할인 / {total.totalPoint && priceComma(total.totalPoint)} 원 적립</div>
        <div className="flex justify-between col-span-3 px-4 py-2 font-medium bg-mint text-brown">
          <span>적립금 선할인</span>
          <span>0 원</span>
        </div>
        <div className="col-span-12 border-b border-ocher/50"></div>

        {/* <div className="col-span-2 px-4 py-2">적립금 사용</div>
        <div className="col-span-7 px-4 py-2"> {total.totalPoint && priceComma(total.totalPoint)}</div>
        <div className="flex justify-between col-span-3 px-4 py-2 font-medium bg-mint text-brown">
          <span>적립금 사용</span>
          <span>0 원</span>
        </div>
        <div className="col-span-12 border-b border-ocher"></div> */}

        <div className="col-span-2 px-4 py-2">배송비 할인</div>
        <div className="self-center col-span-7 px-4">
          <button type="button" className="px-2 py-1 text-sm border rounded-md border-ocher">
            배송 쿠폰 적용
          </button>
        </div>
        <div className="flex justify-between col-span-3 px-4 py-2 font-medium bg-mint text-brown">
          <span>배송비</span>
          <span>{total.totalDeliveryFee && priceComma(total.totalDeliveryFee)} 원</span>
        </div>
        <div className="col-span-12 border-b border-ocher/50"></div>

        <div className="col-span-9 px-4 py-2 text-sm text-ocher">주문 및 결제는 실제로 진행되지 않습니다.</div>
        <div className="flex items-center justify-between col-span-3 px-4 py-2 font-medium bg-mint text-brown">
          <span>최총 결제금액</span>
          <span className="text-2xl font-bold">{total.totalPayment && priceComma(total.totalPayment)} 원</span>
        </div>

        <div className="col-span-9 px-4"></div>
        <div className="flex justify-between col-span-3 px-4 pb-2 text-sm font-medium bg-mint text-brown">
          <span>총 적립금</span>
          <span>{total.totalPoint && priceComma(total.totalPoint)} 원</span>
        </div>
      </div>
      <div className="flex-auto"></div>
      <button
        type="button"
        className="px-24 py-4 mx-auto my-4 text-lg font-medium rounded-md bg-orange text-beige max-w-fit"
        onClick={() => {
          alert('결제에 성공하였습니다');
          router.push({ pathname: '/', query: { id: id } });
        }}
      >
        <span className="text-2xl font-bold">{total.totalPayment && priceComma(total.totalPayment)} 원</span> 결제하기{' '}
      </button>{' '}
    </div>
  );
};

export default OrderPage;
