import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../hooks/index.jsx';
import { selectorChannels } from '../slices/channelsSlice.js';
import { selectorMessages } from '../slices/messagesSlice.js';

function MessagesBox() {
  const { currentChannelId } = useSelector(selectorChannels);
  const messages = useSelector(selectorMessages);

  const currentMessages = messages[currentChannelId]?.map(({ id, author, message }) => (
    <div className="text-break mb-2" key={id}>
      <b>{author}</b>
      {`: ${message}`}
    </div>
  ));

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.getMessage(dispatch);
    socket?.getChannel(dispatch);
    socket?.getRemoveChannel(dispatch);
    socket?.getRenameChannel(dispatch);
  }, [socket]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentMessages}
    </div>
  );
}

export default MessagesBox;
