import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import FormikControl from './FormikControl';
import React from 'react';
import SubmitButton from './SubmitButton';

function LoginForm() {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    console.log('form data', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="chakraInput"
              type="email"
              name="email"
              label="Email"
            />
            <FormikControl
              control="chakraInput"
              type="password"
              name="password"
              label="Password"
            />
            <SubmitButton formik={formik} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
