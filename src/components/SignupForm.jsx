import React, { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  FormFloating, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

function SignupForm() {
  const inputEl = useRef();
  const navigate = useNavigate();
  const { logIn, setUserId } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Formik
      validateOnBlur={false}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().min(3, 'errors.signup.sizeUsername').max(20, 'errors.signup.sizeUsername').required('errors.signup.required'),
        password: Yup.string().min(6, 'errors.signup.sizePassword').required('errors.signup.required'),
        confirmPassword: Yup.string().test('confirmPassword', 'errors.signup.mustMatch', (value, { parent: { password } }) => value === password),
      })}
      onSubmit={({ username, password }, actions) => {
        axios.post(routes.sendSignup(), { username, password }).then(({ data }) => {
          setUserId(data);
          logIn();
          navigate(routes.home);
        }).catch((err) => {
          if (err.isAxiosError && err.response.status === 409) {
            actions.setFieldError('confirmPassword', 'errors.signup.userExists');
            inputEl.current.select();
            return;
          }
          throw err;
        });
      }}
    >
      {({ errors }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('forms.signup.header')}</h1>
          <FormFloating className="mb-3">
            <FormControl isInvalid={errors.username} id="username" autoComplete="username" placeholder="От 3 до 20 символов" required name="username" type="text" as={Field} innerRef={inputEl} />
            <FormLabel htmlFor="username">{t('forms.signup.username')}</FormLabel>
            {errors.username && <div className="invalid-tooltip" placement="right">{t(errors.username)}</div>}
          </FormFloating>
          <FormFloating className="mb-3">
            <FormControl isInvalid={errors.password} id="password" autoComplete="new-password" placeholder="Не менее 6 символов" required name="password" type="password" as={Field} />
            <FormLabel htmlFor="password" className="form-label">{t('forms.signup.password')}</FormLabel>
            {errors.password && <div className="invalid-tooltip" placement="right">{t(errors.password)}</div>}
          </FormFloating>
          <FormFloating className="mb-4">
            <FormControl isInvalid={errors.confirmPassword} id="confirmPassword" autoComplete="new-password" placeholder="Пароли должны совпадать" required name="confirmPassword" type="password" as={Field} />
            <FormLabel htmlFor="confirmPassword" className="form-label">{t('forms.signup.confirmPassword')}</FormLabel>
            {errors.confirmPassword && <div className="invalid-tooltip" placement="right">{t(errors.confirmPassword)}</div>}
          </FormFloating>
          <Button variant="outline-primary" className="w-100" type="submit">{t('buttons.signup')}</Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
