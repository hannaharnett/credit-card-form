import React, { Component } from "react";
import VirtualCreditCard from "./CreditCard";
import Input from "./Input";
import FormErrors from "./FormErrors";
import "./form-container.css";

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ccName: "",
      number: "",
      exp: "",
      cvc: "",
      formErrors: { ccName: "", number: "", exp: "", cvc: "" },
      ccNameValid: false,
      numberValid: false,
      expValid: false,
      cvcValid: false,
      formValid: false,
      isFlipped: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleClickFlip = this.handleClickFlip.bind(this);
    this.handleClickUnFlip = this.handleClickUnFlip.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit(this);
  }
  handleUserInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  };
  // Validate each input and updates error object in state
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let { ccNameValid, numberValid, expValid, cvcValid } = this.state;

    switch (fieldName) {
      case "ccName":
        ccNameValid = (value.match(/^[a-zA-z]+$/) ? true : false);
        fieldValidationErrors.ccName = (ccNameValid ? "" : "Please enter name");
        break;
      case "number":
        numberValid = (value.match(/^[0-9]{16}/) ? true : false);
        fieldValidationErrors.number = (numberValid
          ? ""
          : "Please enter card number");
        break;
      case "exp":
        expValid = (value.match(/^[0-9]{4}/) ? true : false);
        fieldValidationErrors.exp = (expValid ? "" : "Date is invalid");
        break;
      case "cvc":
        cvcValid = (value.match(/^[0-9]{3}/) ? true : false);
        fieldValidationErrors.cvc = (cvcValid ? "" : "Security code is invalid");
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        ccNameValid: ccNameValid,
        numberValid: numberValid,
        expValid: expValid,
        cvcValid: cvcValid
      },
      this.validateForm
    );
  }
  // When every input is valid, whole form is valid
  validateForm() {
    let { ccNameValid, numberValid, expValid, cvcValid } = this.state;
    this.setState({
      formValid: ccNameValid && numberValid && expValid && cvcValid
    });
  }
  // Flips card to show CVC on back when CVC input is in focus/clicked
  handleClickFlip() {
    this.setState({ isFlipped: true });
  }
  // Flips back to front side when NAME, NUMBER & EXP is in focus/clicked
  handleClickUnFlip() {
    this.setState({ isFlipped: false });
  }
  handleSubmit() {
    this.setState({
      ccName: "",
      number: "",
      exp: "",
      cvc: ""
    })
  }
  render() {
    const { ccName, number, exp, cvc, formErrors, isFlipped } = this.state;
    return (
      <div>
        <div className="container">
          <VirtualCreditCard
            ccName={ccName}
            number={number}
            exp={exp}
            cvc={cvc}
            isFlipped={isFlipped}
          />
          <div className="form-container">
            <form onSubmit={this.handleSubmit}>
              <FormErrors formErrors={formErrors} />
              <div className="form-group">
                {/* Credit Card Number */}
                <Input
                  type="text"
                  name="number"
                  title="Card Number"
                  value={number}
                  onChange={this.handleUserInput}
                  onFocus={this.handleClickUnFlip}
                  maxLength="16"
                />
                {/* Cardholder's Name */}
                <Input
                  type="text"
                  name="ccName"
                  title="Name on card"
                  value={ccName}
                  onChange={this.handleUserInput}
                  onFocus={this.handleClickUnFlip}
                />
              </div>
              <div className="form-group">
                {/* Expiration date */}
                <Input
                  type="text"
                  name="exp"
                  title="Expiration date"
                  value={exp}
                  placeholder="MM / YY"
                  onChange={this.handleUserInput}
                  onFocus={this.handleClickUnFlip}
                  maxLength="4"
                />
                {/* Security code */}
                <Input
                  type="text"
                  name="cvc"
                  title="Security code"
                  value={cvc}
                  onChange={this.handleUserInput}
                  onFocus={this.handleClickFlip}
                  maxLength="3"
                />
              </div>
              <input type="submit" value="Submit" disabled={!this.state.formValid} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
