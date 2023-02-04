import React from 'react';
import NavBar from './Navbar';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-texture">
      <NavBar />
      <div className="flex flex-col flex-auto w-full h-full">{props.children}</div>
    </div>
  );
}
