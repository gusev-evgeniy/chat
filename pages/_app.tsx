import { AppProps } from 'next/app';
import Head from 'next/head';
import '../globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TalkClub</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
