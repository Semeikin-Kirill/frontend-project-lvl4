import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

function Navigation() {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand to={routes.home} as={Link}>{t('brand')}</Navbar.Brand>
        {loggedIn && <Button onClick={() => logOut()}>{t('buttons.logout')}</Button>}
      </Container>
    </Navbar>
  );
}

export default Navigation;
