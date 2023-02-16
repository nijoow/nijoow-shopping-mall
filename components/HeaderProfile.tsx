import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';

const HeaderProfile = () => {
  const { logOut } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <button
      type="button"
      className="relative flex items-center justify-center border-2 rounded-full w-fit border-brown"
      onClick={() => {
        setOpenProfile(!openProfile);
      }}
    >
      <AiOutlineUser size={20} className="text-brown" />
      <motion.div
        variants={{ visible: { opacity: 1, translateY: 4 }, hidden: { opacity: 0, scale: 0.5, originY: 0 } }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        animate={openProfile ? 'visible' : 'hidden'}
        className="absolute z-20 flex flex-col w-24 gap-1 p-3 rounded-lg shadow-md top-full bg-brown/95 text-beige bg-blend-multiply bg-texture"
      >
        <Link href="/mypage/profile" className="p-1">
          프로필
        </Link>
        <button className="p-1" onClick={() => logOut()}>
          로그아웃
        </button>
      </motion.div>
    </button>
  );
};

export default HeaderProfile;