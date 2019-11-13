import React from "react";
import "./form-errors.css";

const FormErrors = ({ formErrors }) => {
  return (
    <div>
      {Object.keys(formErrors).map((fieldName, i) => {
        if (formErrors[fieldName].length > 0) {
          return <p key={i}>{formErrors[fieldName]}</p>;
        } else {
          return "";
        }
      })}
    </div>
  );
};

export default FormErrors;
