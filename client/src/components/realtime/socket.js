import { io } from 'socket.io-client';
// const port = process.env.REACT_APP_BACKEND_URL;
const port = 'localhost:5000';

export const initSocket = async () => {
  const options = {
    'force new connection': true,
    reconnectionAttempt: '1',
    timeout: 10000,
    transports: ['websocket'],
  };
  return io(port, options);
};
