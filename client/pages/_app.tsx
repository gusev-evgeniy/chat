import axios from 'axios';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from '../globalStyles';

// import '../globals.scss';
import { wrapper } from '../store';
import { setUserData } from '../store/slices/user';


//TODO many request to server in getInitialProps, because slice or selector
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>TalkClub</title>
      </Head>
      <GlobalStyle />
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
  
  try {
    console.log('MyApp.getInitialProps', ctx.req.headers)

    axios.defaults.headers.get.Cookie = ctx.req.headers.cookie as string;
    const { data } = await axios.get('http://localhost:5050/user/me');
    store.dispatch(setUserData(data));
  } catch (err) {}

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default wrapper.withRedux(MyApp);
