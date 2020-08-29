import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function Textarea(props) {
  const { name, ...rest } = props;
  return <Field as="textarea" id={name} name={name} {...rest} />;
}

export default WithFormParts(Textarea);
