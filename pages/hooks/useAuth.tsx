import React, { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserLoaded(session ? true : false);
      if (session?.user) {
        console.log('seesion!');
      }
    });

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      const currentUser = session?.user;
      setUser(currentUser ?? null);
      setUserLoaded(!!currentUser);
      if (currentUser) {
        // logIn(currentUser.id, currentUser.email);
        console.log(currentUser);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const logIn = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword(payload);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => await supabase.auth.signOut();

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

  return { logIn, logOut, signUp };
};

export default useAuth;
