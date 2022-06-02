import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';

function Navigation() {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand to="/" as={Link}>{t('brand')}</Navbar.Brand>
        {loggedIn && <Button onClick={() => logOut()}>{t('buttons.logout')}</Button>}
      </Container>
    </Navbar>
  );
}

export default Navigation;
