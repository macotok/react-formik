import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function RadioButtons(props) {
  const { name, options, ...rest } = props;
  return (
    <Field id={name} name={name} {...rest}>
      {({ field }) => {
        return options.map((option) => (
          <React.Fragment key={option.key}>
            <input
              id={option.value}
              type="radio"
              {...field}
              value={option.value}
              checked={field.value === option.value}
            />
            <label htmlFor={option.value}>{option.key}</label>
          </React.Fragment>
        ));
      }}
    </Field>
  );
}

export default WithFormParts(RadioButtons);
