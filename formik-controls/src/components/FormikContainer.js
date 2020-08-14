import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import FormikControl from './FormikControl';
import React from 'react';

function FormikContainer() {
  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option 3' },
  ];

  const rcOptions = [
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
  ];

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required'),
    description: Yup.string().required('Description is Required'),
    selectOption: Yup.string().required('Select is Required'),
    radioOption: Yup.string().required('Required'),
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
          <FormikControl
            control="input"
            name="email"
            label="Email"
            type="email"
            formik={formik}
          />
          <FormikControl
            control="textarea"
            name="description"
            label="Description"
            formik={formik}
          />
          <FormikControl
            control="select"
            label="Select a topic"
            name="selectOption"
            options={dropdownOptions}
            formik={formik}
          />
          <FormikControl
            control="radio"
            label="Radio topic"
            name="radioOption"
            options={rcOptions}
            formik={formik}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
