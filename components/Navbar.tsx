import Link from 'next/link';
import React, { useState } from 'react';
import { Desktop, Mobile } from '../utils/mediaQuery';

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <nav className="w-full h-12 overflow-hidden text-zinc-100 bg-zinc-700">
      <div className="flex items-center w-full h-full gap-20 mx-auto max-w-7xl ">
        <div className="ml-4 text-lg font-bold cursor-pointer">nijoow shopping mall</div>
        <Desktop>
          <>
            <ul className="flex gap-12 text-sm font-bold">
              <li className="cursor-pointer">menu1</li>
              <li className="cursor-pointer">menu2</li>
              <li className="cursor-pointer">menu3</li>
            </ul>{' '}
            <div className="flex-auto"></div>
            <ul className="flex gap-8 text-sm ">
              {' '}
              <Link href="/login">
                <li className="cursor-pointer">Login</li>{' '}
              </Link>
              <Link href="/signup">
                <li className="cursor-pointer">SignUp</li>
              </Link>
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
