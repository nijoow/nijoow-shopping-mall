import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';
import { Desktop, Mobile } from '../utils/mediaQuery';

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { session, logOut } = useAuth();

  return (
    <nav className="relative w-full flex-none h-12 overflow-hidden bg-beige/40 text-brown">
      <div className="flex items-center w-full h-full gap-20 mx-auto max-w-7xl px-4">
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
            <ul className="flex gap-8 text-sm font-medium ">
              {session ? (
                <>
                  {' '}
                  <Link href="/user/profile">
                    <li className="flex items-center justify-center w-5 h-5 border rounded-full cursor-pointer border-brown">
                      <AiOutlineUser size={20} className="text-brown" />
                    </li>{' '}
                  </Link>{' '}
                  <div onClick={() => logOut()}>
                    <li className="cursor-pointer ">로그아웃</li>{' '}
                  </div>
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

export default Navbar;
