import React from 'react';
import NavBar from './Navbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-zinc-100">
      <NavBar />
      <div className="flex-auto h-full">{props.children}</div>
    </div>
  );
}
