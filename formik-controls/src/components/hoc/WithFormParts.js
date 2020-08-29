import { ErrorMessage } from 'formik';
import React from 'react';
import TextError from '../TextError';

const WithFormParts = (FunctionalComponent) => (props) => {
  const { label, ...rest } = props;
  const { name } = rest;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <FunctionalComponent {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default WithFormParts;
