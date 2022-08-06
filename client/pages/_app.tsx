import axios from 'axios';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '../globalStyles';

// import '../globals.scss';
import { wrapper } from '../store';
import { setUserData } from '../store/slices/user';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TalkClub</title>
      </Head>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {
  if (!ctx.req) {
    return {
      pageProps: Component.getInitialProps,
    };
  }
  console.log('ctx.req.headers.cookie', ctx.req.headers.cookie);
  try {
    axios.defaults.headers.get.Cookie = ctx.req.headers.cookie;

    const { data } = await axios.get('http://localhost:5050/api/user/me');
    store.dispatch(setUserData(data));
  } catch (err) {}

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default wrapper.withRedux(MyApp);
