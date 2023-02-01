import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

const useAuth = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logIn = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword(payload);
      if (error) {
        console.log(error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => await supabase.auth.signOut().then(() => router.push('/login'));

  const signUp = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        console.log(error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { logIn, logOut, signUp, loading, session };
};

export default useAuth;
