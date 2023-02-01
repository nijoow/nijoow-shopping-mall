import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useAuth from '../hooks/useAuth';

interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}
const SignUp: NextPage = () => {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp({ email: data.email.trim(), password: data.password.trim() });
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form className="flex flex-col w-full h-full max-w-md shadow-lg max-h-[36rem] p-8 gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
        <span className="mx-auto mb-auto text-xl font-semibold">SIGN UP</span>
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm">이메일</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700"
            type="text"
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: '올바른 이메일 양식이 아닙니다',
              },
            })}
          />{' '}
          <span className="h-3 m-1 text-xs text-red-500">{errors.email?.message}</span>
        </label>{' '}
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm">비밀번호</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: '비밀번호는 8자리 이상으로 입력해주세요',
              },
              maxLength: { value: 64, message: '비밀번호는 64자리 이하로 입력해주세요' },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[₩~`!@#$%^&*()_+=-])(?=.*[0-9]).{8,25}$/,
                message: '숫자+영문자+특수문자를 조합해주세요',
              },
            })}
          />{' '}
          {errors.password ? (
            <span className="h-3 m-1 text-xs text-red-500">{errors.password?.message}</span>
          ) : (
            <span className="h-3 m-1 text-xs text-zinc-500">{!watch('password') && '숫자+영문자+특수문자를 조합한 8자리 이상으로 입력해주세요'}</span>
          )}
        </label>{' '}
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm">비밀번호 확인</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            {...register('passwordCheck', { required: true, validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다' })}
          />{' '}
          <span className="h-3 m-1 text-xs text-red-500">{errors.passwordCheck?.message}</span>
        </label>
        <button
          className={` w-32 h-12 mt-auto flex items-center justify-center font-medium rounded-lg text-zinc-100  ${loading ? 'bg-zinc-400' : 'bg-zinc-700'}`}
          type="submit"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin" size={20} /> : '회원가입'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
