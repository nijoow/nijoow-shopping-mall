import { GetServerSideProps } from 'next/types';
import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import useAuth from '../../hooks/useAuth';
import { supabaseEnv } from '../../config/config';
import { AiOutlineUser } from 'react-icons/ai';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context, supabaseEnv);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return {
      props: { email: session.user.email },
    };
  } else
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
};

const Profile = ({ email }: { email: string }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-full h-full max-w-7xl py-8 px-4 gap-8">
        <div className="flex flex-col gap-1">
          <span className="w-12 h-12 rounded-full bg-mint flex mx-auto items-center justify-center">
            <AiOutlineUser size={30} className="text-brown" />
          </span>
          <span className="text-beige font-medium mx-auto">{email}</span>
        </div>
        <div className="flex gap-2 max-w-lg mx-auto w-full">
          {[
            { value: 0, title: '전체' },
            { value: 0, title: '입금/결제' },
            { value: 0, title: '배송중' },
            { value: 0, title: '배송완료' },
            { value: 0, title: '구매확정' },
          ].map((element) => (
            <div className="flex flex-col justify-center items-center  bg-orange w-1/5 py-1.5 rounded-md shadow-md cursor-pointer" key={element.title}>
              <span className="font-semibold text-lg text-beige">{element.value}</span>
              <span className="text-sm text-beige">{element.title}</span>
            </div>
          ))}
        </div>{' '}
        <table>
          <thead>
            <tr className="border-y border-ocher">
              {['상품정보', '주문일자', '주문번호', '주문금액', '주문상태'].map((element) => (
                <th className="p-3 text-beige" key={element}>
                  {element}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <td className="p-3 ">
              <div className="flex gap-2">
                <div className="w-24 h-24 flex items-center justify-center bg-mint cursor-pointer text-orange font-semibold">상품이미지</div>
                <div className="flex flex-col h-full my-auto flex-auto gap-2 ">
                  <span className="font-medium cursor-pointer text-beige">상품명</span>
                  <span className="text-ocher">상품 옵션</span>
                </div>
              </div>
            </td>
            <td>
              <div className="flex items-center justify-center text-beige">2023.02.05</div>
            </td>
            <td>
              <div className="flex items-center justify-center cursor-pointer text-beige">20230205000001</div>
            </td>
            <td>
              <div className="flex flex-col items-center justify-center gap-2 text-beige">
                <span>00,000원</span>
                <span>1개</span>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center justify-center gap-2 text-beige">
                <span className="cursor-pointer">구매확정</span>
                <span className="cursor-pointer">배송조회</span>
              </div>
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
