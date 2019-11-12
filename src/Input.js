import React from "react";

const Input = props => {
  return (
    <div>
      <label for={props.name} className="form-label">
        {props.title}
      </label>
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        minLength={props.minLength}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default Input;
