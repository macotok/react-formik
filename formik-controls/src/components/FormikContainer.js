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

  const radioOptions = [
    { key: 'Option 1', value: 'rOption1' },
    { key: 'Option 2', value: 'rOption2' },
    { key: 'Option 3', value: 'rOption3' },
  ];

  const checkboxOptions = [
    { key: 'Option 1', value: 'cOption1' },
    { key: 'Option 2', value: 'cOption2' },
    { key: 'Option 3', value: 'cOption 3' },
  ];

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required'),
    description: Yup.string().required('Description is Required'),
    selectOption: Yup.string().required('Select is Required'),
    radioOption: Yup.string().required('Radio is Required'),
    checkboxOption: Yup.array().required('Checkbox id Required'),
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
            options={radioOptions}
            formik={formik}
          />
          <FormikControl
            control="checkbox"
            label="Checkbox topics"
            name="checkboxOption"
            options={checkboxOptions}
            formik={formik}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
