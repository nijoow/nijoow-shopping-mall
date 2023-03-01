import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { supabaseEnv } from '../config/config';
import FullScreenLoading from '../components/FullScreenLoading';
import { Router } from 'next/router';
import { RecoilRoot } from 'recoil';
import SSRComplete from '../context/SSRComplete';

const ssrRoute = ['/profile'];

function MyApp({
  Component,
  pageProps,
  router,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient(supabaseEnv));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = (url: string) => {
      if (ssrRoute.find((route) => String(url).includes(route))) setLoading(true);
    };
    const end = (url: string) => {
      if (ssrRoute.find((route) => String(url).includes(route))) setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <RecoilRoot>
        <SSRComplete>
          <Head>
            <meta content="width=device-width, initial-scale=1" name="viewport" />
          </Head>
          {loading && <FullScreenLoading />}{' '}
          <Layout>
            <Component {...pageProps} />
          </Layout>{' '}
        </SSRComplete>
      </RecoilRoot>
    </SessionContextProvider>
  );
}
export default MyApp;
