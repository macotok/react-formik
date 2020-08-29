import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function Select(props) {
  const { name, options, ...rest } = props;
  return (
    <Field as="select" id={name} name={name} {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.key}
        </option>
      ))}
    </Field>
  );
}

export default WithFormParts(Select);
