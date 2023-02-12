import React from 'react';
import Footer from './Footer';
import NavBar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen bg-blend-multiply bg-brown bg-texture ">
      <NavBar />{' '}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="flex flex-col flex-auto w-full relative"
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
