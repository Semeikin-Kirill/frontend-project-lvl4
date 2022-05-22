import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  FormFloating, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Feedback from 'react-bootstrap/Feedback';
import { useAuth } from '../hooks/index.jsx';

const loginPatch = '/api/v1/login';

function LoginForm() {
  const inputEl = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        setAuthFailed(false);
        axios.post(loginPatch, values)
          .then(({ data }) => {
            localStorage.setItem('userId', JSON.stringify(data));
            logIn();
            navigate('/');
          }).catch((err) => {
            if (err.isAxiosError && err.response.status === 401) {
              setAuthFailed(true);
              inputEl.current.select();
              return;
            }
            throw err;
          });
      }}
    >
      <Form className="col-12 col-md-6 mt-3 mt-mb-0">
        <h1 className="text-center mb-4">Войти</h1>
        <FormFloating className="mb-3">
          <FormControl isInvalid={authFailed} id="username" autoComplete="username" placeholder="Ваш ник" required name="username" type="text" as={Field} innerRef={inputEl} />
          <FormLabel htmlFor="username">Ваш ник</FormLabel>
        </FormFloating>
        <FormFloating className="mb-4">
          <FormControl isInvalid={authFailed} id="password" autoComplete="current-password" placeholder="Пароль" required name="password" type="password" as={Field} />
          <FormLabel htmlFor="password" className="form-label">Пароль</FormLabel>
          <Feedback type="invalid" tooltip={authFailed}>Неверные имя пользователя или пароль</Feedback>
        </FormFloating>
        <Button variant="outline-primary" className="w-100" type="submit">Войти</Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
