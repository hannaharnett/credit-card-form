import React from "react";

const Button = props => {
  return (
    <button className="form-button" onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default Button;
