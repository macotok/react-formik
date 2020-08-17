import { Form, Formik } from 'formik';
import {
  checkboxOptions,
  dropdownOptions,
  radioOptions,
} from '../constants/formOptions';

import FormikControl from './FormikControl';
import React from 'react';
import SubmitButton from './SubmitButton';
import { initialValues } from '../validation/initialValues';
import { validationSchema } from '../validation/validationSchema';

function FormikContainer() {
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
