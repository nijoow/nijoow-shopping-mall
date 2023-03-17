import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineShopping, AiOutlineHeart, AiOutlineLogout } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import useAuth from '../../hooks/useAuth';
import { cartState } from '../../state/state';
import { Desktop, Mobile } from '../../utils/mediaQuery';
import HeaderProfile from './Profile';

const Header = () => {
  const [cart] = useRecoilState(cartState);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { session, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => setOpenSidebar(false));

    return () => {
      router.events.off('routeChangeComplete', () => setOpenSidebar(false));
    };
  }, []);

  return (
    <nav className="relative flex-none w-full h-12 bg-beige text-brown bg-blend-multiply bg-texture">
      <div className="flex items-center w-full h-full gap-20 px-4 mx-auto max-w-7xl">
        <Link href="/" className="text-lg font-medium cursor-pointer font-Insomnia min-w-fit">
          nijoow vintage
        </Link>
        <Desktop>
          <>
            <ul className="flex gap-12 text-sm font-medium ">
              <Link href="/shop">
                <li className="cursor-pointer ">SHOP</li>
              </Link>
            </ul>
            <div className="flex-auto"></div>
            <div className="flex items-center gap-8 text-sm font-medium ">
              <Link href="/mypage/favorites">
                <AiOutlineHeart size={24} className="text-brown" />
              </Link>
              <Link href="/mypage/carts" className="relative">
                <AiOutlineShopping size={26} className="text-brown" />{' '}
                <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-0.5 -right-2 bg-brown">
                  <span className="text-[10px] text-beige">{cart.length}</span>
                </div>
              </Link>
              {session ? (
                <>
                  <HeaderProfile />
                </>
              ) : (
                <>
                  <Link href="/user/login" className="cursor-pointer text-xs border border-brown px-2 py-1 rounded-lg">
                    로그인/회원가입
                  </Link>
                </>
              )}
            </div>
          </>
        </Desktop>
        <Mobile>
          <>
            <div className="ml-auto space-y-1.5 " onClick={() => setOpenSidebar(!openSidebar)}>
              <div
                className={`w-6 h-[3px] rounded-full transition-all duration-300 ${openSidebar ? 'translate-y-[9px] rotate-[135deg] bg-beige' : 'bg-brown'}`}
              ></div>
              <div className={`w-6 h-[3px] rounded-full  transition-all duration-300 ${openSidebar ? 'opacity-0 bg-beige' : 'opacity-100 bg-brown'}`}></div>
              <div
                className={`w-6 h-[3px] rounded-full transition-all duration-300 ${openSidebar ? '-translate-y-[9px] -rotate-[135deg] bg-beige' : 'bg-brown'}`}
              ></div>
            </div>
            {openSidebar && (
              <div
                className="fixed top-0 right-0 z-30 w-full h-full bg-black/70"
                onClick={() => {
                  setOpenSidebar(false);
                }}
              />
            )}
            <div
              className={`fixed top-0 right-0 flex flex-col w-5/6 max-w-[360px] z-40 min-h-screen h-full bg-brown transition-all duration-300 ${
                openSidebar ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex items-center h-12 gap-8 px-6 bg-black/10">
                {session ? (
                  <>
                    <Link href="/mypage/favorites">
                      <AiOutlineHeart size={24} className="text-beige" />
                    </Link>
                    <Link href="/mypage/carts" className="relative">
                      <AiOutlineShopping size={26} className="text-beige" />{' '}
                      <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -top-0.5 -right-2 bg-beige">
                        <span className="text-[10px] text-brown">{cart.length}</span>
                      </div>
                    </Link>
                    <Link className="flex items-center justify-center border-2 rounded-full cursor-pointer border-beige" href={'/mypage/profile'}>
                      <AiOutlineUser size={20} className="text-beige md:text-brown" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/user/login" className="cursor-pointer text-xs border border-beige text-beige px-2.5 py-1.5 rounded-lg">
                      로그인/회원가입
                    </Link>
                  </>
                )}
                <div className="ml-auto space-y-1.5 z-50" onClick={() => setOpenSidebar(!openSidebar)}>
                  <div
                    className={`w-6 h-[3px] rounded-full transition-all duration-300 ${
                      openSidebar ? 'translate-y-[9px] rotate-[135deg] bg-beige' : 'bg-brown'
                    }`}
                  ></div>
                  <div className={`w-6 h-[3px] rounded-full  transition-all duration-300 ${openSidebar ? 'opacity-0 bg-beige' : 'opacity-100 bg-brown'}`}></div>
                  <div
                    className={`w-6 h-[3px] rounded-full transition-all duration-300 ${
                      openSidebar ? '-translate-y-[9px] -rotate-[135deg] bg-beige' : 'bg-brown'
                    }`}
                  ></div>
                </div>
              </div>
              <div className="flex-auto  flex flex-col">
                <Link href="/" className={`py-4 px-4 w-full text-xl font-medium cursor-pointer text-beige ${router.pathname === '/' ? 'bg-black/30' : ''}`}>
                  HOME
                </Link>
                <Link
                  href="/"
                  className={`py-4 px-4 w-full text-xl font-medium cursor-pointer text-beige ${router.pathname.includes('/shop') ? 'bg-black/30' : ''}`}
                >
                  SHOP
                </Link>
              </div>
              {session && (
                <div className="ml-auto mb-4 mr-4 p-3 text-beige flex items-center gap-2 border border-beige rounded-lg" onClick={() => logOut()}>
                  <AiOutlineLogout size={20} /> 로그아웃
                </div>
              )}
            </div>
          </>
        </Mobile>
      </div>
    </nav>
  );
};

export default Header;
