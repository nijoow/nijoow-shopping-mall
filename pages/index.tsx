import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return <div className="flex items-center justify-center w-full h-full text-zinc-800">Landing Page</div>;
};

export default Home;
