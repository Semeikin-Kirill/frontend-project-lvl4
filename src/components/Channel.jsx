import React from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { currentСhannelChanged } from '../slices/channelsSlice.js';
import { shownModal } from '../slices/modalSlice.js';

function Channel({
  name, id, removable, currentChannelId,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changedCurrentChannel = (channelId) => () => dispatch(currentСhannelChanged(channelId));

  const clickRemove = () => dispatch(shownModal({ type: 'removeChannel', extra: { id } }));

  const clickRename = () => dispatch(shownModal({ type: 'renameChannel', extra: { id, name } }));

  const classnames = cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': id === currentChannelId });
  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex">
          <button type="button" className={`text-truncate ${classnames}`} onClick={changedCurrentChannel(id)}>
            <span className="me-1">{t('prefix')}</span>
            {name}
          </button>
          <Dropdown.Toggle className="flex-grow-0" split variant={currentChannelId === id ? 'secondary' : ''}>
            <span className="visually-hidden">{t('channelManagement')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={clickRemove}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item href="#" onClick={clickRename}>{t('renname')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  }
  return (
    <li key={id} className="nav-item w-100">
      <button type="button" className={classnames} onClick={changedCurrentChannel(id)}>
        <span className="me-1">{t('buttons.channel')}</span>
        {name}
      </button>
    </li>
  );
}

export default Channel;
