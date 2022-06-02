import {
  Field, Form, Formik,
} from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button, FormControl, Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useSocket } from '../../hooks/index.jsx';
import { selectorChannels } from '../../slices/channelsSlice.js';
import { closedModal, selectorModal } from '../../slices/modalSlice.js';

function AddChannel() {
  const socket = useSocket();
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector(selectorModal);
  const { channels } = useSelector(selectorChannels);
  const listChannels = channels.map(({ name }) => name);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current?.focus();
  }, [isOpen]);

  const handleClose = () => dispatch(closedModal());

  return (
    <Modal show={isOpen && type === 'addChannel'} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validateOnBlur={false}
          validationSchema={Yup.object({
            name: Yup.string().min(3, t('errors.addChannel.size')).max(20, t('errors.addChannel.size')).notOneOf(listChannels, t('errors.addChannel.unique'))
              .required(t('errors.addChannel.required')),
          })}
          onSubmit={({ name }) => {
            socket.createChannel({ name });
            handleClose();
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <FormControl innerRef={inputEl} isInvalid={errors.name} className="mb-2" name="name" id="name" as={Field} />
                <label htmlFor="name" className="visually-hidden">{t('modals.addChannel.text')}</label>
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

export default AddChannel;
