import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useAuth from '../../hooks/useAuth';

interface FormValues {
  email: string;
  password: string;
  passwordCheck: string;
}
const SignUpPage: NextPage = () => {
  const { signUp, loading, message } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp({ email: data.email.trim(), password: data.password.trim() });
  };

  return (
    <>
      <form className="flex flex-col w-full h-full max-w-md m-auto p-8 gap-2 items-center bg-beige/70 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
        <span className="text-3xl font-medium cursor-pointer text-brown font-Insomnia my-12">nijoow vintage</span>
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm text-brown">이메일</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700 placeholder:text-ocher/70"
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
          <span className="h-3 m-1 text-xs text-orange">{errors.email?.message}</span>
        </label>{' '}
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm text-brown">비밀번호</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700 placeholder:text-ocher/70"
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
            <span className="h-3 m-1 text-xs text-orange">{errors.password?.message}</span>
          ) : (
            <span className="h-3 m-1 text-xs text-brown">{!watch('password') && '숫자+영문자+특수문자를 조합한 8자리 이상으로 입력해주세요'}</span>
          )}
        </label>{' '}
        <label className="flex flex-col w-full gap-0.5">
          <span className="mx-1 text-sm text-brown">비밀번호 확인</span>
          <input
            className="w-full h-12 px-4 border rounded-lg border-zinc-200 focus:outline-zinc-700 placeholder:text-ocher/70"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
            {...register('passwordCheck', { required: true, validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다' })}
          />{' '}
          <span className="h-3 m-1 text-xs text-orange">{errors.passwordCheck?.message}</span>
        </label>
        <button
          className={` w-32 h-12 mt-6 flex items-center justify-center font-medium rounded-lg text-beige  ${loading ? 'bg-ocher' : 'bg-brown'}`}
          type="submit"
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin" size={20} /> : '회원가입'}
        </button>
      </form>
      {message.payload && (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/50">
          <div className="bg-beige rounded-2xl flex-col max-w-xs w-full flex items-center px-8 pt-12 pb-6 justify-center">
            <span className="text-brown">{message.payload}</span>
            <Link href="/" className=" w-32 h-12 mt-6 flex items-center justify-center font-medium rounded-lg text-beige bg-brown">
              확인
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
