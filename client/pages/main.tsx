import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Chat } from '../components/chat';
import { Dialogs } from '../components/dialogs';
import { NewRoom } from '../components/createRoom';
import { useAppSelector } from '../store/hooks';
import { selectUserData } from '../store/slices/user';
import { MainWrapper } from '../styles';
import { instance } from '../api';

const Main = ({ dialogs }) => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);
  console.log('dialogs', dialogs);
  const router = useRouter();
  const me = useAppSelector(selectUserData);

  const toggleNewRoom = () => {
    setNewRoomIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (!me) router.push('/auth');
  }, [me, router]);

  return (
    <MainWrapper padding={0}>
      <Dialogs toggleNewRoom={toggleNewRoom} newRoomIsOpen={newRoomIsOpen} />
      {newRoomIsOpen ? <NewRoom /> : <Chat />}
    </MainWrapper>
  );
};

// export const getServerSideProps = async () => {
//   try {
//     const { data } = await instance.get('room/');

//     return {
//       props: {
//         dialogs: data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
//   return {
//     props: {
//       dialogs: null,
//     },
//   };
// };

Main.getInitialProps =  async ({ req }) => {
  try {
    // axios.defaults.headers.get.Cookie = ctx.req.headers.cookie as string;

    // const { data } = await axios.get('http://localhost:5050/api/user/me');
    // store.dispatch(setUserData(data));

    const { data } = await instance.get('room/');
    console.log('444444444444', data)
    // store.dispatch(setUserData(data));

    return {
      props: {
        dialogs: data,
      },
    };
  } catch (err) {
    console.log('err', err)
  }

  return {
    props: {
      dialogs: null,
    },
  };
};

// export default wrapper.withRedux(Main);
export default Main;
