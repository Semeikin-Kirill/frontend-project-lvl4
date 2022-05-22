import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectorChannels } from '../slices/channelsSlice.js';
import FormMessage from './FormMessage.jsx';
import MessagesBox from './MessagesBox.jsx';

function Messages() {
  const { currentChannelId, channels } = useSelector(selectorChannels);
  const cannel = channels.find(({ id }) => id === currentChannelId);
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{cannel && `# ${cannel.name}`}</b>
          </p>
          <span className="text-muted">сообщения</span>
        </div>
        <MessagesBox />
        <FormMessage />
      </div>
    </Col>
  );
}

export default Messages;
