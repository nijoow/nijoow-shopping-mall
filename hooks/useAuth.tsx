import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cartState, favoritesState, userEmailState } from '../state/state';
interface MessageProps {
  type: 'default' | 'success' | 'error';
  payload: string | null;
}
const MESSAGE_DEFAULT: MessageProps = {
  type: 'default',
  payload: null,
};
const useAuth = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const resetCart = useResetRecoilState(cartState);
  const resetFavorites = useResetRecoilState(favoritesState);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<MessageProps>(MESSAGE_DEFAULT);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logIn = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword(payload);
      if (error) {
        setError('이메일/비밀번호를 확인해주세요');
      } else {
        if (userEmail && userEmail !== payload.email) {
          resetCart();
          resetFavorites();
        }
        setUserEmail(payload.email);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => await supabase.auth.signOut().then(() => router.push('/user/login'));

  const signUp = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        console.log(error);
        setMessage({ type: 'error', payload: error.message });
      } else {
        setMessage({ type: 'success', payload: '회원가입 메일이 전송되었습니다' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { logIn, logOut, signUp, loading, session, error, message };
};

export default useAuth;
