import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  FormFloating, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Feedback from 'react-bootstrap/Feedback';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

function LoginForm() {
  const inputEl = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);
  const { logIn, setUserId } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        username: Yup.string().required('errors.login.required'),
        password: Yup.string().required('errors.login.required'),
      })}
      onSubmit={(values) => {
        setAuthFailed(false);
        axios.post(routes.sendLogin(), values)
          .then(({ data }) => {
            setUserId(data);
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
        <h1 className="text-center mb-4">{t('forms.login.header')}</h1>
        <FormFloating className="mb-3">
          <FormControl isInvalid={authFailed} id="username" autoComplete="username" placeholder={t('forms.login.username')} required name="username" type="text" as={Field} innerRef={inputEl} />
          <FormLabel htmlFor="username">{t('forms.login.username')}</FormLabel>
        </FormFloating>
        <FormFloating className="mb-4">
          <FormControl isInvalid={authFailed} id="password" autoComplete="current-password" placeholder={t('forms.login.password')} required name="password" type="password" as={Field} />
          <FormLabel htmlFor="password" className="form-label">{t('forms.login.password')}</FormLabel>
          <Feedback type="invalid" tooltip={authFailed}>{t('errors.login.incorrect')}</Feedback>
        </FormFloating>
        <Button variant="outline-primary" className="w-100" type="submit">{t('buttons.login')}</Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
