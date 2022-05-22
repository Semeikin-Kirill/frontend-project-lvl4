import { io } from 'socket.io-client';
import { messageAdded } from '../slices/messagesSlice.js';

export default () => {
  const socket = io();

  const sendMessage = (data) => {
    socket.emit('newMessage', data, (response) => {
      if (response.status !== 'ok') {
        console.log('status');
        setTimeout(() => sendMessage(data), 3000);
      }
    });
  };

  return {
    sendMessage,
    getMessage: (dispatch) => socket.on('newMessage', (message) => dispatch(messageAdded(message))),
    id: () => socket.id,
  };
};
