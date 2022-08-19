import { AppProps } from 'next/app';
import Head from 'next/head';

import '../globals.scss';
import { wrapper } from '../store';

//TODO переделать typing
//TODO шапка чата для приватной и групповой комнаты

//TODO прочитанное-непрочитанное сообщение
//TODO количество непрочитанных в комнате

//TODO поиск по комнатам
//TODO сортировка чатов по дате последнего сообщения
//TODO исправить создание чатов
//TODO групповой чат. сообщение от админа (создал группу. покинул чат)
//TODO выход из чата
//TODO кнопка назад при авторизации или создание нового чата
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
