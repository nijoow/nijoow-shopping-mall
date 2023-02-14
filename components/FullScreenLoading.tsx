import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
      <AiOutlineLoading3Quarters className="z-50 m-auto animate-spin text-mint" size={50} />
    </div>
  );
};

export default FullScreenLoading;
