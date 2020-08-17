import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().required('Email is Required'),
  description: Yup.string().required('Description is Required'),
  selectOption: Yup.string().required('Select is Required'),
  radioOption: Yup.string().required('Radio is Required'),
  checkboxOption: Yup.array().required('Checkbox id Required'),
  birthDate: Yup.date().required('BirthDate is Required').nullable(),
});
