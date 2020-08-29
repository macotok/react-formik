import 'react-datepicker/dist/react-datepicker.css';

import DateView from 'react-datepicker';
import { Field } from 'formik';
import React from 'react';
import WithFormParts from './hoc/WithFormParts';

function DatePicker(props) {
  const { name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <DateView
            id={name}
            {...field}
            {...rest}
            selected={value}
            onChange={(val) => setFieldValue(name, val)}
          />
        );
      }}
    </Field>
  );
}

export default WithFormParts(DatePicker);
