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
    this.inputFocus = React.createRef();
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleClickFlip = this.handleClickFlip.bind(this);
    this.handleClickUnFlip = this.handleClickUnFlip.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit(this);
  }
  componentDidMount() {
    this.inputFocus.current.focus();
  }
  handleUserInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value}, () => {
      let timeout = null;
      // Clearning timout first will prevent the previous task 
      // from executing if it has been less than 1000ms
      clearTimeout(timeout);
      timeout = setTimeout(() => this.validateField(name, value), 1000);
    })
  }
  // Validate each input and updates error object in state
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let { ccNameValid, numberValid, expValid, cvcValid } = this.state;

    switch (fieldName) {
      case "ccName":
        ccNameValid = (value.match(/^[a-zA-z]+$/) ? true : false);
        fieldValidationErrors.ccName = (ccNameValid ? "" : "Your name should only contain letters");
        break;
      case "number":
        numberValid = (value.match(/^[0-9]{16}/) ? true : false);
        fieldValidationErrors.number = (numberValid
          ? ""
          : "Please enter a 16 digits card number");
        break;
      case "exp":
        expValid = (value.match(/^[0-9]{4}/) ? true : false);
        fieldValidationErrors.exp = (expValid ? "" : "Please enter date in format: MMDD");
        break;
      case "cvc":
        cvcValid = (value.match(/^[0-9]{3}/) ? true : false);
        fieldValidationErrors.cvc = (cvcValid ? "" : "Security code should only be 3 digits");
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
      <>
        <header>
          <h1>React Credit Card Form</h1>
        </header>
        <main className="container">
          <VirtualCreditCard
            ccName={ccName}
            number={number}
            exp={exp}
            cvc={cvc}
            isFlipped={isFlipped}
          />
          <form onSubmit={this.handleSubmit}>
              {/* Credit Card Number */}
              <Input
                id="number"
                name="number"
                type="text"
                title="Card Number"
                value={number}
                onChange={this.handleUserInput}
                onFocus={this.handleClickUnFlip}
                maxLength="16"
                ref={this.inputFocus}
              />
              <FormErrors formError={formErrors.number} />
              {/* Cardholder's Name */}
              <Input
                id="ccName"
                name="ccName"
                type="text"
                title="Name on card"
                value={ccName}
                onChange={this.handleUserInput}
                onFocus={this.handleClickUnFlip}
              />
              <FormErrors formError={formErrors.ccName} />
              {/* Expiration date */}
              <Input
                id="exp"
                name="exp"
                type="text"
                title="Expiration date"
                value={exp}
                onChange={this.handleUserInput}
                onFocus={this.handleClickUnFlip}
                maxLength="4"
              />
              <FormErrors formError={formErrors.exp} />
              {/* Security code */}
              <Input
                id="cvc"
                name="cvc"
                type="text"
                title="Security code"
                value={cvc}
                onChange={this.handleUserInput}
                onFocus={this.handleClickFlip}
                maxLength="3"
              />
              <FormErrors formError={formErrors.cvc} />
            <input type="submit" value="Submit" disabled={!this.state.formValid} />
          </form>
        </main>
      </>
    );
  }
}
