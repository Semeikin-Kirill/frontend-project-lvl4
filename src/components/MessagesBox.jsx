import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { selectorChannels } from '../slices/channelsSlice.js';
import { selectorMessages } from '../slices/messagesSlice.js';

function MessagesBox() {
  const { currentChannelId } = useSelector(selectorChannels);
  const messages = useSelector(selectorMessages);
  const element = useRef();

  const currentMessages = messages[currentChannelId]?.map(({ id, author, message }) => (
    <div className="text-break mb-2" key={id}>
      <b>{author}</b>
      {`: ${filter.clean(message)}`}
    </div>
  ));

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

  useEffect(() => {
    element.current.scrollTo(0, element.current.scrollHeight);
  });

  return (
    <div ref={element} id="messages-box" className="chat-messages overflow-auto px-5">
      {currentMessages}
    </div>
  );
}

export default MessagesBox;
