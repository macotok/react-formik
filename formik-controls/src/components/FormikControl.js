import ChakraInput from './ChakraInput';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';
import FieldArrayInput from './FieldArrayInput';
import Input from './Input';
import RadioButtons from './RadioButtons';
import React from 'react';
import Select from './Select';
import Textarea from './Textarea';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <RadioButtons {...rest} />;
    case 'checkbox':
      return <CheckboxGroup {...rest} />;
    case 'fieldArrayInput':
      return <FieldArrayInput {...rest} />;
    case 'date':
      return <DatePicker {...rest} />;
    case 'chakraInput':
      return <ChakraInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
