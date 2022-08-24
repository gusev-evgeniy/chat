import axios from 'axios'
import { useRouter } from 'next/router'
import React, { FC, Fragment, memo, ReactElement, useEffect } from 'react'
import Layout from '../../layout'
import { wrapper } from '../../store'
import { setRoomsData } from '../../store/slices/rooms'
import { setUserData } from '../../store/slices/user'

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';


import { setUnreadedCount } from '../../store/slices/rooms';

import { Empty } from '../../styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAllReadedMessages } from '../../store/slices/messages';
import { socket } from '../../api/socket';
import { EVENTS } from '../../utils/constants';
import { getChatData } from '../../store/selectors';
import { StyledChat } from '../../components/chat/styled'
import { Header } from '../../components/chat/header'
import { ChatItem } from '../../components/chat/item'
import { MessageForm } from '../../components/chat/messageForm'
import { getMessages } from '../../store/actions/messages'

const Chat = () => {
  const { query } = useRouter();

  const { messages, selected, myId, typingText } = useAppSelector(getChatData);
  const { id, unreadedMessagesCount } = selected || {}

  console.log('render')
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.id) {
      console.log('query.id', query.id)
      dispatch(getMessages(query.id as string))
    }
  }, [query.id])

  useEffect(() => {
    if (!id || !unreadedMessagesCount) {
      return;
    }

    socket.emit(EVENTS.MESSAGE.READ, { roomId: id }, () => {
      dispatch(setUnreadedCount({ roomId: id, count: 0 }));
      dispatch(setAllReadedMessages());
    });
  }, [id, unreadedMessagesCount]);

  if (!selected) {
    return (
      <StyledChat empty={true}>
        <Empty>Сhoose who you would like to write to</Empty>
      </StyledChat>
    );
  }
  const { type, participants } = selected;

  const online =
    type === 'private'
      ? !!participants.find(participant => participant.id !== myId)?.online
      : false;

  const substring =
    type === 'private'
      ? dayjs(
          participants.find(participant => participant.id !== myId)?.wasOnline as string
        ).format('YYYY-MM-DD')
      : `${participants.length} участников, ${
          participants.filter(({ online }) => online).length
        } в сети`;

  const title =
    type === 'private'
      ? (participants.find(participant => participant.id !== myId)?.name as string)
      : (selected.title as string);

  return (
    <StyledChat>
      <Header isNewRoom={selected.id === null} online={online} substring={substring} title={title} />

      <div className='messages_wrapper'>
        <div className='messages'>
          {messages.map((message, index) => {
            const getDay = (createdAt: string) => dayjs(createdAt).format('YYYY-MM-DD');
            const isLast = messages[index + 1]?.author.id !== message.author.id;
            const isNewDay = getDay(messages[index - 1]?.createdAt) !== getDay(message.createdAt);

            return (
              <Fragment key={message.id}>
                {isNewDay && <Empty margin='15px'>{dayjs(message.createdAt).format('DD MMMM')}</Empty>}
                <ChatItem {...message} isLast={isLast} />
              </Fragment>
            );
          })}
          <div className='typing'>{typingText}</div>
        </div>
      </div>

      <MessageForm selected={selected} />
    </StyledChat>
  );
}

// Chat.getLayout = (page: ReactElement) => (
//   <Layout>
//     {page}
//   </Layout>
// )

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, ...etc }) => {
//   try {
//     const cookie = req.headers.cookie;

//     if (!cookie) {
//       return {
//         redirect: {
//           destination: '/auth',
//           permanent: false,
//         },
//       };
//     }

//     axios.defaults.headers.get.Cookie = cookie as string;
//     // const { data } = await axios.get('http://localhost:5050/user/me');
//     // store.dispatch(setUserData(data));

//     const rooms = await axios.get('http://localhost:5050/room/');
//     store.dispatch(setRoomsData(rooms.data));
//   } catch ({ response }: any) {
//     if (response?.data.message === 'Unauthenticated') {
//       return {
//         redirect: {
//           destination: '/auth',
//           permanent: false,
//         },
//       };
//     }
//   }
// });

export default Chat;