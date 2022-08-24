import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

import '../globals.scss';
import { wrapper } from '../store';

//TODO шапка чата для приватной, групповой и новой комнат 

//TODO прочитанное-непрочитанное сообщение
//TODO количество непрочитанных в комнате

//TODO поиск по комнатам
//TODO групповой чат. сообщение от админа (создал группу. покинул чат)
//TODO выход из чата
//TODO пути для чатов
//TODO адаптив
//TODO тесты

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>TalkClub</title>
      </Head>
      {getLayout(<Component  {...pageProps} />)}
    </>
  );
}

export default wrapper.withRedux(MyApp);
