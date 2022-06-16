import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useChatApi } from '../../hooks/index.jsx';
import { closedModal, selectorModal } from '../../slices/modalSlice.js';

function RemoveChannel() {
  const chatApi = useChatApi();
  const { isOpen, type, extra } = useSelector(selectorModal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClose = () => dispatch(closedModal());

  const handleRemove = () => {
    chatApi.removeChannel(extra);
    handleClose();
    toast.success(t('deleteChannel'));
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
