import React, { Component } from "react";
import VirtualCreditCard from "./VirtualCreditCard";

// Regexes
const numberRegex = /^\d{16}$/;
const expRegex = /^\d{4}$/;
const cvcRegex = /^\d{3}$/;

const defaultProps = {
  cards: [
    {
      name: "blank",
      src:
        "https://upload.wikimedia.org/wikipedia/commons/d/df/Map-circle-grey.svg"
    },
    {
      name: "mastercard",
      src:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
    },
    {
      name: "visa",
      src:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014_logo_detail.svg"
    },
    {
      name: "dinersclub",
      src:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg"
    },
    {
      name: "americanExpress",
      src:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png"
    }
  ]
};

// If error object in state is empty, form is valid
const formValidation = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

// Checks the first digits in number input and sets the right logo src attribute
const findLogo = number => {
  let cards = defaultProps.cards;
  let src;
  if (
    parseInt(number.substring(0, 2)) > 50 &&
    parseInt(number.substring(0, 2)) < 56
  ) {
    src = cards[1].src;
  } else if (parseInt(number.substring(0, 1)) === 4) {
    src = cards[2].src;
  } else if (
    parseInt(number.substring(0, 2)) === 36 ||
    parseInt(number.substring(0, 2)) === 38 ||
    parseInt(number.substring(0, 2)) === 39
  ) {
    src = cards[3].src;
  } else if (
    parseInt(number.substring(0, 2)) === 34 ||
    parseInt(number.substring(0, 2)) === 37
  ) {
    src = cards[4].src;
  } else {
    src = cards[0].src;
  }
  return src;
};

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: "",
      number: "",
      exp: "",
      cvc: "",
      logoSrc:
        "https://upload.wikimedia.org/wikipedia/commons/d/df/Map-circle-grey.svg",
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
    let { errors, number } = this.state;

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
    this.setState({ logoSrc: findLogo(number) });
  };
  // checks validity on submit and resets state
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ formValidation: formValidation(this.state.errors) });
    this.setState({ cardholder: "", number: "", exp: "", cvc: "" });
  }
  render() {
    const {
      cardholder,
      number,
      exp,
      cvc,
      formValidation,
      logoSrc
    } = this.state;
    return (
      <div>
        <VirtualCreditCard
          cardholder={cardholder}
          number={number}
          exp={exp}
          cvc={cvc}
          logoSrc={logoSrc}
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
