import { io } from 'socket.io-client';
import { channelAdded, removedChannel, renamedChannel } from '../slices/channelsSlice.js';
import { messageAdded } from '../slices/messagesSlice.js';

export default () => {
  const socket = io();

  const sendMessage = (data) => {
    socket.emit('newMessage', data, (response) => {
      if (response.status !== 'ok') {
        setTimeout(() => sendMessage(data), 3000);
      }
    });
  };

  const createChannel = (data) => {
    socket.emit('newChannel', data, (response) => {
      if (response.status !== 'ok') {
        setTimeout(() => createChannel(data), 3000);
      }
    });
  };

  const removeChannel = (data) => {
    socket.emit('removeChannel', data, (response) => {
      if (response.status !== 'ok') {
        setTimeout(() => createChannel(data), 3000);
      }
    });
  };

  const renameChannel = (data) => {
    socket.emit('renameChannel', data, (response) => {
      if (response.status !== 'ok') {
        setTimeout(() => createChannel(data), 3000);
      }
    });
  };

  return {
    sendMessage,
    getMessage: (dispatch) => socket.on('newMessage', (message) => dispatch(messageAdded(message))),
    createChannel,
    getChannel: (dispatch) => socket.on('newChannel', (channel) => dispatch(channelAdded(channel))),
    removeChannel,
    getRemoveChannel: (dispatch) => socket.on('removeChannel', (id) => dispatch(removedChannel(id))),
    renameChannel,
    getRenameChannel: (dispatch) => socket.on('renameChannel', (channel) => dispatch(renamedChannel(channel))),
  };
};
