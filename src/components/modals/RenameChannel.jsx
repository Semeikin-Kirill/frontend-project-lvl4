import React, { useEffect, useRef } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import {
  Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../hooks/index.jsx';
import { closedModal, selectorModal } from '../../slices/modalSlice.js';

function RenameChannel() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const inputEl = useRef(null);
  const { isOpen, type, extra } = useSelector(selectorModal);

  useEffect(() => {
    inputEl.current?.select();
  }, [isOpen]);

  const handleClose = () => dispatch(closedModal());

  return (
    <Modal show={isOpen && type === 'renameChannel'} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validateOnBlur={false}
          validationSchema={Yup.object({
            name: Yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов').required('Обязательное поле'),
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
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                <div className="invalid-feedback">{errors.name}</div>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={handleClose}>Отменить</Button>
                  <Button type="submit">Отправить</Button>
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
