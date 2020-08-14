import Input from './Input';
import React from 'react';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
    case 'select':
    case 'radio':
    case 'checkbox':
    case 'date':
    default:
  }
}

export default FormikControl;
