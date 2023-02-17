import React from 'react';
type Props = {
  children: React.ReactNode;
};
const ModalLayout = (props: Props) => {
  return (
    <div className="fixed w-screen h-screen inset-0 flex items-center justify-center bg-black/60">
      <div className="rounded-2xl w-full max-w-md p-6 bg-beige flex flex-col items-center gap-4">{props.children}</div>
    </div>
  );
};
export default ModalLayout;
