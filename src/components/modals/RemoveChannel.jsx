import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import { closedModal, selectorModal } from '../../slices/modalSlice.js';

function RemoveChannel() {
  const socket = useSocket();
  const { isOpen, type, extra } = useSelector(selectorModal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(closedModal());

  const handleRemove = () => {
    socket.removeChannel(extra);
    handleClose();
  };

  return (
    <Modal show={isOpen && type === 'removeChannel'} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.text')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={handleRemove}>{t('buttons.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
