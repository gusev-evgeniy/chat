import { AppProps } from 'next/app';
import Head from 'next/head';

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

export default wrapper.withRedux(MyApp);
