import { ErrorMessage, Field, FieldArray } from 'formik';

import React from 'react';
import TextError from './TextError';

function FieldArrayInput(props) {
  const { label, name } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          return (
            <div>
              {values[name].map((value, index) => (
                <div key={index}>
                  <Field name={`${name}[${index}]`} />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => push('')}>
                +
              </button>
            </div>
          );
        }}
      </FieldArray>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default FieldArrayInput;
