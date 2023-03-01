import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/70">
      <AiOutlineLoading3Quarters className="z-50 m-auto !stroke-[4px] animate-spin text-orange stroke-mint" size={50} />
    </div>
  );
};

export default FullScreenLoading;
