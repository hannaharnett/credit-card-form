import React from "react";
import "./input.css";

const Input = props => {
  const { id, title, type, value, onChange, onFocus, minLength, maxLength } = props;
  return (
    <div className="input-container">
      <label htmlFor={id} className="form-label">
        {title}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
