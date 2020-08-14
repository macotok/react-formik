import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import FormControl from './FormikControl';
import React from 'react';

function FormikContainer() {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required'),
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
      {(formik) => (
        <Form>
          <FormControl
            control="input"
            name="email"
            label="Email"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
