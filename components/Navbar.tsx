import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';
import { Desktop, Mobile } from '../utils/mediaQuery';

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { session, logOut } = useAuth();
  return (
    <nav className="w-full h-12 overflow-hidden text-zinc-100 bg-zinc-700">
      <div className="flex items-center w-full h-full gap-20 mx-auto max-w-7xl ">
        <div className="ml-4 text-lg font-medium cursor-pointer">nijoow shopping mall</div>
        <Desktop>
          <>
            <ul className="flex gap-12 text-sm font-medium">
              <li className="cursor-pointer">menu1</li>
              <li className="cursor-pointer">menu2</li>
              <li className="cursor-pointer">menu3</li>
            </ul>{' '}
            <div className="flex-auto"></div>
            <ul className="flex gap-8 text-sm ">
              {session ? (
                <>
                  {' '}
                  <Link href="/profile">
                    <li className="flex items-center justify-center w-5 h-5 border rounded-full cursor-pointer border-zinc-200">
                      <AiOutlineUser size={20} />
                    </li>{' '}
                  </Link>{' '}
                  <div onClick={() => logOut()}>
                    <li className="cursor-pointer">LogOut</li>{' '}
                  </div>
                </>
              ) : (
                <>
                  {' '}
                  <Link href="/login">
                    <li className="cursor-pointer">Login</li>{' '}
                  </Link>
                  <Link href="/signup">
                    <li className="cursor-pointer">SignUp</li>
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
