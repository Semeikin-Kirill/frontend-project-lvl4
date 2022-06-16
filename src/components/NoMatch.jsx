import React from 'react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../routes.js';

function NoMatch() {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image fluid alt={t('noMatch')} src="https://cdn2.hexlet.io/assets/error-pages/404-34f20d4d98c81c575950c89d4c49027513d0bb3f6adbb3ed85ca0923496f65df.png" />
      <h1 className="h4 text-muted">{t('noMatch')}</h1>
      <p className="text-muted">
        {t('transition')}
        <Link to={routes.home}>{t('linkHome')}</Link>
      </p>
    </div>
  );
}

export default NoMatch;
