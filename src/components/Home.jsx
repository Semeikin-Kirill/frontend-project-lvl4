import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchData } from '../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { SocketContext } from '../contexts/index.jsx';
import socketClient from '../api/index.js';
import AddChannel from './modals/AddChannel.jsx';
import RemoveChannel from './modals/RemoveChannel.jsx';
import RenameChannel from './modals/RenameChannel.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

function Home() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(socketClient());
    dispatch(fetchData({ headers: getAuthHeader() }));
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <AddChannel />
      <RemoveChannel />
      <RenameChannel />
    </SocketContext.Provider>
  );
}

export default Home;
