import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { supabase } from '../lib/supabase';
import useAuth from './hooks/useAuth';

interface FormValues {
  email: string;
  password: string;
}
const LogIn: NextPage = () => {
  const { logIn } = useAuth();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const [emailCheck, setEmailCheck] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    logIn({ email: data.email.trim(), password: data.password.trim() });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col w-full h-full max-w-md shadow-lg max-h-[36rem] p-8 gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
        <span className="my-auto text-xl font-semibold">LOG IN</span>
        <div className="w-full mb-auto">
          <div className="relative z-10 flex items-center w-full">
            <input
              className={`w-full h-12 px-4 border  border-zinc-200 focus:outline-zinc-700 ${emailCheck ? 'rounded-t-lg' : 'rounded-lg'}`}
              {...register('email', { required: true })}
            />
            {!emailCheck && (
              <span
                className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer right-4"
                onClick={() => setEmailCheck(!emailCheck)}
              >
                <AiOutlineSwapRight />
              </span>
            )}
          </div>
          <div className={`relative flex items-center transition-all duration-500 w-full ${emailCheck ? 'translate-y-0' : '-translate-y-full'}`}>
            <input className="w-full h-12 px-4 border rounded-b-lg border-zinc-200 focus:outline-zinc-700" {...register('password', { required: true })} />
            <button className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer right-4" type="submit">
              <AiOutlineSwapRight />
            </button>
          </div>
        </div>
        <span className="text-sm">forgot password?</span>
      </form>
    </div>
  );
};

export default LogIn;
