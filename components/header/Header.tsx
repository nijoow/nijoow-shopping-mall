import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import useAuth from '../../hooks/useAuth';
import { cartState } from '../../state/state';
import { Desktop, Mobile } from '../../utils/mediaQuery';
import HeaderProfile from './Profile';

const Header = () => {
  const [cart] = useRecoilState(cartState);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { session } = useAuth();
  return (
    <nav className="relative flex-none w-full h-12 bg-beige text-brown bg-blend-multiply bg-texture">
      <div className="flex items-center w-full h-full gap-20 px-4 mx-auto max-w-7xl">
        <Link href="/" className="text-lg font-medium cursor-pointer font-Insomnia">
          nijoow vintage
        </Link>
        <Desktop>
          <>
            <ul className="flex gap-12 text-sm font-medium ">
              {' '}
              <Link href="/shop">
                <li className="cursor-pointer ">SHOP</li>
              </Link>
            </ul>{' '}
            <div className="flex-auto"></div>
            <ul className="flex items-center gap-8 text-sm font-medium ">
              {session ? (
                <>
                  <Link href="/mypage/favorites">
                    <AiOutlineHeart size={24} className="text-brown" />
                  </Link>
                  <Link href="/mypage/carts" className="relative">
                    <AiOutlineShopping size={26} className="text-brown" />{' '}
                    <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-0.5 -right-2 bg-brown">
                      <span className="text-[10px] text-beige">{cart.length}</span>
                    </div>
                  </Link>
                  <HeaderProfile />
                </>
              ) : (
                <>
                  {' '}
                  <Link href="/user/login">
                    <li className="cursor-pointer ">로그인</li>{' '}
                  </Link>
                  <Link href="/user/signup">
                    <li className="cursor-pointer">회원가입</li>
                  </Link>
                </>
              )}
            </ul>
          </>
        </Desktop>
        <Mobile>
          <>
            <div className="ml-auto mr-4 space-y-2" onClick={() => setOpenSidebar(!openSidebar)}>
              <div className={`w-7 h-[3px] rounded-full bg-zinc-100 transition-all ${openSidebar ? 'translate-y-[11px] rotate-[135deg]' : ''}`}></div>
              <div className={`w-7 h-[3px] rounded-full bg-zinc-100 transition-all ${openSidebar ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`w-7 h-[3px] rounded-full bg-zinc-100 transition-all ${openSidebar ? '-translate-y-[11px] -rotate-[135deg]' : ''}`}></div>
            </div>
          </>
        </Mobile>
      </div>
    </nav>
  );
};

export default Header;
