import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';

function Navigation() {
  const { loggedIn, logOut } = useAuth();

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand to="/" as={Link}>Hexlet Chat</Navbar.Brand>
        {loggedIn && <Button onClick={() => logOut()}>Выйти</Button>}
      </Container>
    </Navbar>
  );
}

export default Navigation;
