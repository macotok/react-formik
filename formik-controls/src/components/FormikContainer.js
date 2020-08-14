import { Form, Formik } from 'formik';

import React from 'react';

function FormikContainer() {
  const initialValues = {};
  const onSubmit = () => {};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => <Form></Form>}
    </Formik>
  );
}

export default FormikContainer;
