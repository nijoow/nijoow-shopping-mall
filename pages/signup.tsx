import { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}
const SignUp: NextPage = () => {
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
      <form className="flex flex-col w-full h-full max-w-md shadow-lg max-h-[36rem] p-8 gap-6 items-center" onSubmit={handleSubmit(onSubmit)}>
        <span className="mx-auto text-lg font-semibold">SIGN UP</span>
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm">이메일</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700"
            type="text"
            placeholder="이메일을 입력해주세요"
            {...register('email')}
          />
        </label>{' '}
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm">비밀번호</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password')}
          />{' '}
        </label>{' '}
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm">비밀번호 확인</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            {...register('passwordCheck')}
          />{' '}
        </label>
        <button className="px-6 py-2 my-auto font-semibold rounded-lg text-zinc-100 border-zinc-200 bg-zinc-700" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
