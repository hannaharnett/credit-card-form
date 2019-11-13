import React from "react";
import "./button.css";

const Button = props => {
  return <button className="form-button">{props.title}</button>;
};

export default Button;
