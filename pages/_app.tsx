import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { instance } from '../api';

import '../globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    instance.get('user/me').then(res => console.log('res', res))
  }, [])
  

  return (
    <>
      <Head>
        <title>TalkClub</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp
