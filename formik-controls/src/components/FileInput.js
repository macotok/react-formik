import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function FileInput(props) {
  const { name, ...rest } = props;
  return (
    <Field name={name} {...rest}>
      {({ form }) => {
        const { setFieldValue } = form;
        return (
          <input
            id={name}
            name={name}
            type="file"
            onChange={(event) => {
              setFieldValue(name, event.currentTarget.files[0]);
            }}
          />
        );
      }}
    </Field>
  );
}

export default WithFormParts(FileInput);
