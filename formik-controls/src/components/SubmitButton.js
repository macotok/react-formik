import React from 'react';

function SubmitButton(props) {
  const { formik } = props;
  return (
    <button type="submit" disabled={!formik.isValid}>
      Submit
    </button>
  );
}

export default SubmitButton;
