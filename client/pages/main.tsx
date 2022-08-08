import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Chat } from '../components/chat';
import { Rooms } from '../components/rooms';
import { NewRoom } from '../components/createRoom';
import { useAppSelector } from '../store/hooks';
import { selectUserData } from '../store/slices/user';
import { MainWrapper } from '../styles';
import { instance } from '../api';
import { wrapper } from '../store';
import { selectRooms, setRoomsData } from '../store/slices/rooms';

const Main = () => {
  const [newRoomIsOpen, setNewRoomIsOpen] = useState(false);

  const router = useRouter();
  const me = useAppSelector(selectUserData);
  const rooms = useAppSelector(selectRooms);

  const toggleNewRoom = () => {
    setNewRoomIsOpen(prev => !prev);
  };

  useEffect(() => {
    if (!me) router.push('/auth');
  }, [me, router]);

  return (
    <MainWrapper padding={0}>
      <Rooms toggleNewRoom={toggleNewRoom} newRoomIsOpen={newRoomIsOpen} myId={me?.id as string} {...rooms}/>
      {newRoomIsOpen ? <NewRoom /> : <Chat selected={rooms.selected}/>}
    </MainWrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
  try {
    const { data } = await instance.get('room/');
    store.dispatch(setRoomsData(data));
    console.log('2222222', data);
  } catch (err) {
    console.log(err);
  }
  return {
    props: null,
  };
});

// export const getServerSideProps = async () => {
//   try {
//     const { data } = await instance.get('room/');
//     console.log('2222222', data);
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

// Main.getInitialProps =  async ({ req }) => {
//   try {
//     // axios.defaults.headers.get.Cookie = ctx.req.headers.cookie as string;

//     // const { data } = await axios.get('http://localhost:5050/api/user/me');
//     // store.dispatch(setUserData(data));

//     const { data } = await instance.get('room/');
//     console.log('444444444444', data)
//     // store.dispatch(setUserData(data));

//     return {
//       props: {
//         dialogs: data,
//       },
//     };
//   } catch (err) {
//     console.log('err', err)
//   }

//   return {
//     props: {
//       dialogs: null,
//     },
//   };
// };

// export default wrapper.withRedux(Main);
export default Main;
