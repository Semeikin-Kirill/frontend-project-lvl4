import React from 'react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';

function Channel({
  name, id, removable, currentChannelId,
}) {
  const classnames = cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': id === currentChannelId });
  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex">
          <button type="button" className={`text-truncate ${classnames}`}>
            <span className="me-1">#</span>
            {name}
          </button>
          <Dropdown.Toggle className="flex-grow-0" split variant={currentChannelId === id ? 'secondary' : ''}>
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Удалить</Dropdown.Item>
            <Dropdown.Item href="#">Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  }
  return (
    <li key={id} className="nav-item w-100">
      <button type="button" className={classnames}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
}

export default Channel;
