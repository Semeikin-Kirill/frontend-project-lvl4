import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div className="text-center">
      <Image fluid alt="Страница не найдена" src="https://cdn2.hexlet.io/assets/error-pages/404-34f20d4d98c81c575950c89d4c49027513d0bb3f6adbb3ed85ca0923496f65df.png" />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        {'Но вы можете перейти '}
        <Link to="/">на главную страницу</Link>
      </p>
    </div>
  );
}

export default NoMatch;
