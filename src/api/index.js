import { io } from 'socket.io-client';
import { channelAdded, removedChannel, renamedChannel } from '../slices/channelsSlice.js';
import { messageAdded } from '../slices/messagesSlice.js';

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
    getMessage: (dispatch) => socket.on('newMessage', (message) => dispatch(messageAdded(message))),
    createChannel: createSocketOperation('newChannel'),
    getChannel: (dispatch) => socket.on('newChannel', (channel) => dispatch(channelAdded(channel))),
    removeChannel: createSocketOperation('removeChannel'),
    getRemoveChannel: (dispatch) => socket.on('removeChannel', (id) => dispatch(removedChannel(id))),
    renameChannel: createSocketOperation('renameChannel'),
    getRenameChannel: (dispatch) => socket.on('renameChannel', (channel) => dispatch(renamedChannel(channel))),
  };
};
