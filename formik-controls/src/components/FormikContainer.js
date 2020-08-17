import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import FormikControl from './FormikControl';
import React from 'react';
import SubmitButton from './SubmitButton';

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
    { key: 'Option 3', value: 'cOption3' },
  ];

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    fieldArrayInput: [''],
    birthDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is Required'),
    description: Yup.string().required('Description is Required'),
    selectOption: Yup.string().required('Select is Required'),
    radioOption: Yup.string().required('Radio is Required'),
    checkboxOption: Yup.array().required('Checkbox id Required'),
    birthDate: Yup.date().required('BirthDate is Required').nullable(),
  });

  const onSubmit = (values) => {
    console.log('form data', values);
    console.log('Saved data', JSON.parse(JSON.stringify(values)));
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
          />
          <FormikControl
            control="textarea"
            name="description"
            label="Description"
          />
          <FormikControl
            control="select"
            label="Select a topic"
            name="selectOption"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Radio topic"
            name="radioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            label="Checkbox topics"
            name="checkboxOption"
            options={checkboxOptions}
          />
          <FormikControl
            control="fieldArrayInput"
            label="multi topic"
            name="fieldArrayInput"
          />
          <FormikControl
            control="fileInput"
            label="file upload"
            name="fileInput"
          />
          <FormikControl control="date" label="Pick a date" name="birthDate" />
          <SubmitButton formik={formik} />
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
