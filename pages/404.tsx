import Link from 'next/link';
import React from 'react';

const NoutFound = () => {
  return (
    <div className="max-w-7xl h-full flex flex-col items-center justify-center mx-auto">
      <div className="gap-4 flex flex-col items-center justify-center  w-full p-24 bg-beige/30 rounded-lg">
        <span className="ml-4 text-3xl font-medium cursor-pointer text-brown font-Insomnia">nijoow vintage</span>
        <span className="text-center text-2xl text-brown">원하시는 페이지를 찾을 수 없습니다.</span>
        <span className="text-center text-brown">
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br /> 변경 혹은 삭제로 인해 접근할 수 없습니다.
        </span>
        <Link href="/" className="border rounded-lg p-2 text-brown border-brown">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NoutFound;
