import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useSocket } from '../hooks/index.jsx';

function FormMessage() {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const socket = useSocket();
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        validationSchema={Yup.object({ body: Yup.string().trim().min(1, 'Min 1').required('required') })}
        onSubmit={({ body }, { setSubmitting, resetForm }) => {
          socket.sendMessage({ message: body, channel: currentChannelId, author: username });
          resetForm();
          setSubmitting(false);
          inputEl.current.focus();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form noValidate className="py-1 border rounded-2">
            <InputGroup hasValidation>
              <FormControl innerRef={inputEl} className="border-0 p-0 ps-2" name="body" placeholder="Введите сообщение..." aria-label="Новое сообщение" as={Field} />
              <button disabled={isSubmitting || !isValid} type="submit" className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormMessage;
