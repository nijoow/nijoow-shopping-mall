import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading3Quarters, AiOutlineSwapRight } from 'react-icons/ai';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import useAuth from '../hooks/useAuth';
import { supabaseEnv } from '../config/config';

interface FormValues {
  email: string;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context, supabaseEnv);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  else
    return {
      props: {},
    };
};

const LogIn: NextPage = () => {
  const { logIn, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [emailCheck, setEmailCheck] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    logIn({ email: data.email.trim(), password: data.password.trim() });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col w-full h-full max-w-md shadow-lg max-h-[36rem] p-8 gap-4 items-center bg-beige" onSubmit={handleSubmit(onSubmit)}>
        <span className="my-auto text-xl font-semibold text-brown">LOG IN</span>
        <div className="w-full mb-auto">
          <div className="relative z-10 flex items-center w-full">
            <input
              className={`w-full h-12 px-4 border border-brown/10 bg-orange/30 text-brown focus:outline-brown ${emailCheck ? 'rounded-t-lg' : 'rounded-lg'}`}
              {...register('email', { required: true })}
            />
            {!emailCheck && (
              <span
                className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer border-brown right-4"
                onClick={() => setEmailCheck(!emailCheck)}
              >
                <AiOutlineSwapRight className="text-brown" />
              </span>
            )}
          </div>
          <div className={`relative flex items-center transition-all duration-500 w-full ${emailCheck ? 'translate-y-0' : '-translate-y-full'}`}>
            <input
              className={`w-full h-12 px-4 bg-orange/30 focus:outline-brown border text-brown border-brown/10 ${emailCheck ? 'rounded-b-lg' : 'rounded-lg'}`}
              type="password"
              {...register('password', { required: true })}
            />
            <button
              className="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer border-brown right-4"
              type="submit"
              disabled={loading}
            >
              {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiOutlineSwapRight />}
            </button>
          </div>
        </div>
        <span className="text-sm text-brown">forgot password?</span>
      </form>
    </div>
  );
};

export default LogIn;
