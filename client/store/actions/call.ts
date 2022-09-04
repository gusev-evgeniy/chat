import Peer from 'simple-peer';
import { AppDispatch, RootState } from '..';
import { socket } from '../../api/socket';
import { EVENTS } from '../../utils/constants';
import { callUser } from '../slices/call';
import { openDialog } from '../slices/dialog';

export const call = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const {
    user: { data: myData },
    rooms: { selected, data },
  } = getState();
  const room = data.find(({ id }) => id === selected);

  if (!room) {
    return;
  }

  const { id: roomId, participants } = room;
  const { id } = participants.find(({ id }) => id !== myData?.id) || {};

  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    dispatch(callUser({ stream, to: id }))

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", data => {
      // socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
      socket.emit(EVENTS.CALL.MADE, { from: myData?.id, to: id, roomId, signal: data }, () => {
        dispatch(openDialog('CALL'));
      });
    })

  });
};
