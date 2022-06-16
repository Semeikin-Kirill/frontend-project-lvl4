import React from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectorChannels } from '../slices/channelsSlice.js';
import { selectorMessages } from '../slices/messagesSlice.js';
import FormMessage from './FormMessage.jsx';
import MessagesBox from './MessagesBox.jsx';

function Messages() {
  const { t } = useTranslation();
  const { currentChannelId, channels } = useSelector(selectorChannels);
  const channel = channels.find(({ id }) => id === currentChannelId);
  const messagesAll = useSelector(selectorMessages);
  const currentMessages = messagesAll[currentChannelId] ?? [];
  const count = currentMessages.length;
  const name = channel?.name;
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`${t('prefix')} ${name}`}</b>
          </p>
          <span className="text-muted">{t('messagesCount', { count })}</span>
        </div>
        <MessagesBox />
        <FormMessage />
      </div>
    </Col>
  );
}

export default Messages;
