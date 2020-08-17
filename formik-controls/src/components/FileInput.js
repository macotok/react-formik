import { ErrorMessage, Field } from 'formik';

import React from 'react';
import TextError from './TextError';

function FileInput(props) {
  const { label, name } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{name}</label>
      <Field name={name}>
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
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default FileInput;
