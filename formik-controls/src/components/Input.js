import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function Input(props) {
  const { name, ...rest } = props;
  return <Field id={name} name={name} {...rest} />;
}

export default WithFormParts(Input);
