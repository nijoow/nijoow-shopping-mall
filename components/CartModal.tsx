import router from 'next/router';
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import ModalLayout from './ModalLayout';

const CartModal = ({ setOpenCartModal }: { setOpenCartModal: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <ModalLayout>
      <div className="w-fit h-fit p-2 rounded-full bg-brown flex items-center justify-center">
        <AiOutlineShopping size={40} className="text-beige" />
      </div>{' '}
      <span className="text-brown ">선택한 상품이 장바구니에 담겼습니다.</span>
      <div className="flex w-full justify-center gap-2">
        <button
          className="px-4 py-2 rounded-md bg-brown text-beige w-full"
          type="button"
          onClick={() => {
            setOpenCartModal(false);
          }}
        >
          계속 쇼핑하기
        </button>
        <button
          className="px-4 py-2 rounded-md border-brown border-2 text-brown w-full"
          type="button"
          onClick={() => {
            router.push('/mypage/cart');
          }}
        >
          장바구니 보기
        </button>
      </div>
    </ModalLayout>
  );
};

export default CartModal;
