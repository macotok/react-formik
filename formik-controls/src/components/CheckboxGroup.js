import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function CheckboxGroup(props) {
  const { name, options, ...rest } = props;
  return (
    <Field id={name} name={name} {...rest}>
      {({ field }) => {
        return options.map((option) => (
          <React.Fragment key={option.key}>
            <input
              id={option.value}
              type="checkbox"
              {...field}
              value={option.value}
              checked={field.value.includes(option.value)}
            />
            <label htmlFor={option.value}>{option.key}</label>
          </React.Fragment>
        ));
      }}
    </Field>
  );
}

export default WithFormParts(CheckboxGroup);
