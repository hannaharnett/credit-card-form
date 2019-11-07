import React, { Component } from "react";
import VirtualCreditCard from "./VirtualCreditCard";

// Regexes
const numberRegex = /^\d{16}$/;
const expRegex = /^\d{4}$/;
const cvcRegex = /^\d{3}$/;

// If error object in state is empty, form is valid
const formValidation = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: "",
      number: "",
      exp: "",
      cvc: "",
      formValidation: false,
      errors: {
        cardholder: "",
        number: "",
        exp: "",
        cvc: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handles changes to inputs and error object
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "cardholder":
        errors.cardholder =
          value.length < 1 ? "Please enter Cardholder's name." : "";
        break;
      case "number":
        errors.number = numberRegex.test(value)
          ? ""
          : "Card number is not valid.";
        break;
      case "exp":
        errors.exp = expRegex.test(value) ? "" : "Date is not correct.";
        break;
      case "cvc":
        errors.cvc = cvcRegex.test(value) ? "" : "Security code is not valid.";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  // checks validity on submit and resets state
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formValidation: formValidation(this.state.errors) });
    this.setState({ cardholder: "", number: "", exp: "", cvc: "" });
  }
  render() {
    const { cardholder, number, exp, cvc, formValidation } = this.state;
    return (
      <div>
        <VirtualCreditCard
          cardholder={cardholder}
          number={number}
          exp={exp}
          cvc={cvc}
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="cardholder"
            value={cardholder}
            placeholder="NAME"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="number"
            value={number}
            placeholder="CARD NUMBER"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="exp"
            value={exp}
            placeholder="GOOD THROUGH"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="cvc"
            value={cvc}
            placeholder="SECURITY CODE"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
          <p>Form is {formValidation ? "submitted" : "invalid"}</p>
        </form>
      </div>
    );
  }
}
