import Peer from 'simple-peer';
import { AppDispatch, RootState } from '..';
import { socket } from '../../api/socket';
import { UserBD } from '../../type/user';
import { EVENTS } from '../../utils/constants';
import { callUser } from '../slices/call';
import { openDialog } from '../slices/dialog';

export const call =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      user: { data: myData },
      rooms: { selected, data },
    } = getState();
    const room = data.find(({ id }) => id === selected);

    if (!room) {
      return;
    }

    const { participants } = room;
    console.log('participants', participants)
    console.log('myData', myData)
    const user = participants.find(({ id }) => id !== myData?.id);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });
        dispatch(callUser({ stream, to: user as UserBD, peer }));

        const sendCall = (signal: Peer.SignalData) => {
          socket.emit(EVENTS.CALL.CALL, { to: user?.socketId, signal }, () => {
            dispatch(openDialog('CALL'));
          });
        };

        peer.on('signal', sendCall);
      });
  };
