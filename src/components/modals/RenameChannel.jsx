import React, { useEffect, useRef } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import {
  Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';
import { closedModal, selectorModal } from '../../slices/modalSlice.js';

function RenameChannel() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputEl = useRef(null);
  const { isOpen, type, extra } = useSelector(selectorModal);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current?.select();
  }, [isOpen]);

  const handleClose = () => dispatch(closedModal());

  return (
    <Modal show={isOpen && type === 'renameChannel'} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validateOnBlur={false}
          validationSchema={Yup.object({
            name: Yup.string().min(3, t('errors.renameChannel.size')).max(20, t('errors.renameChannel.size')).required(t('errors.renameChannel.required')),
          })}
          initialValues={{
            name: extra?.name ?? '',
          }}
          onSubmit={({ name }) => {
            socket.renameChannel({ name, id: extra.id });
            handleClose();
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <FormControl innerRef={inputEl} isInvalid={errors.name} className="mb-2" name="name" id="name" as={Field} />
                <label className="visually-hidden" htmlFor="name">{t('modals.renameChannel.text')}</label>
                <div className="invalid-feedback">{errors.name}</div>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={handleClose}>{t('buttons.cancel')}</Button>
                  <Button type="submit">{t('buttons.send')}</Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
