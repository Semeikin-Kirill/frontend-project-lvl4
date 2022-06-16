import { io } from 'socket.io-client';

export default () => {
  const socket = io();

  const createSocketOperation = (action) => (data) => {
    socket.emit(action, data, (response) => {
      if (response.status !== 'ok') {
        setTimeout(() => createSocketOperation(action)(data), 3000);
      }
    });
  };

  return {
    sendMessage: createSocketOperation('newMessage'),
    getMessage: (cb) => socket.on('newMessage', cb),
    createChannel: createSocketOperation('newChannel'),
    getChannel: (cb) => socket.on('newChannel', cb),
    removeChannel: createSocketOperation('removeChannel'),
    getRemoveChannel: (cb) => socket.on('removeChannel', cb),
    renameChannel: createSocketOperation('renameChannel'),
    getRenameChannel: (cb) => socket.on('renameChannel', cb),
  };
};
