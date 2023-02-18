import { Server } from 'socket.io';

export default async (io: Server, socket: any) => {
  // const acceptCall = ({ signal, to }) => {
  //   io.to(users[to]).emit(EVENTS.CALL.ACCEPTED, { signal });
  // };

  // const callUser = async ({ signal, to }, callback) => {
  //   callback();

  //   const me = await User.findOneBy({ id: socket.me.id });
  //   console.log('1111', me);
  //   io.to(users[to]).emit(EVENTS.CALL.GET, { signal, from: me });
  // };

  // const endCall = async ({ roomId }) => {
  //   const text = `User ${socket.me.name} end call`;
  //   const message = await createSystemMessage(text, roomId);

  //   io.to(roomId).emit(EVENTS.CALL.ENDED, { roomId, message });
  // };
  
    
  // socket.on(EVENTS.CALL.MADE, callUser);
  // socket.on(EVENTS.CALL.END, endCall);
  // socket.on(EVENTS.CALL.ACCEPT, acceptCall);
}