import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = useRef<Socket>();

  if (!socketRef.current) {
    socketRef.current = typeof window !== 'undefined' && io('http://localhost:5050');
  } else {
    socketRef.current.connect();
  }

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log('disconnect!!!');
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current as Socket;
};
