import { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface FormValues {
  email: string;
  password: string;
}
const LogIn: NextPage = () => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [emailCheck, setEmailCheck] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col w-full h-full max-w-md shadow-lg max-h-[36rem] p-8 items-center" onSubmit={handleSubmit(onSubmit)}>
        <span className="mx-auto mb-6 text-lg font-semibold">LOGIN</span>

        <div className="relative z-10 flex items-center w-full">
          <input
            className={`w-full h-12 px-4 border  border-zinc-200 focus:outline-zinc-700 ${emailCheck ? 'rounded-t-lg' : 'rounded-lg'}`}
            {...register('email')}
          />
          {!emailCheck && (
            <span
              className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer right-4"
              onClick={() => setEmailCheck(!emailCheck)}
            >
              →
            </span>
          )}
        </div>
        <div className={`relative flex items-center transition-all w-full ${emailCheck ? 'translate-y-0' : '-translate-y-full'}`}>
          <input className="w-full h-12 px-4 border rounded-b-lg border-zinc-200 focus:outline-zinc-700" {...register('password')} />
          <button className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer right-4" type="submit">
            →
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
