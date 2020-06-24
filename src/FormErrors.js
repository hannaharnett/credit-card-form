import React from "react";
import "./form-errors.css";

const FormErrors = ({ formError }) => {
  let errorMessage;
  if (formError.length > 0) {
    errorMessage = <p aria-label="error-message" >{formError}</p>
  } else {
    errorMessage = ""
  }
  return (
    <>
      {errorMessage}
    </>
  );
};

export default FormErrors;
