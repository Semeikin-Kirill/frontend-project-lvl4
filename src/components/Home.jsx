import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchData } from '../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import AddChannel from './modals/AddChannel.jsx';
import RemoveChannel from './modals/RemoveChannel.jsx';
import RenameChannel from './modals/RenameChannel.jsx';
import { useAuth } from '../hooks/index.jsx';

function Home() {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    dispatch(fetchData({ headers: getAuthHeader() }));
  }, []);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <AddChannel />
      <RemoveChannel />
      <RenameChannel />
    </>
  );
}

export default Home;
