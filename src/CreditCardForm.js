import React, { Component } from "react";
import VirtualCreditCard from "./VirtualCreditCard";

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      exp: "",
      cvc: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handles changes to all inputs in form
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // resets state to empty
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ name: "", number: "", exp: "", cvc: "" });
  }
  render() {
    return (
      <div>
        <VirtualCreditCard
          name={this.state.name}
          number={this.state.number}
          exp={this.state.exp}
          cvc={this.state.cvc}
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="NAME ON CARD"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="number"
            value={this.state.number}
            placeholder="CARD NUMBER"
            maxLength="16"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="exp"
            value={this.state.exp}
            placeholder="GOOD THROUGH"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="cvc"
            value={this.state.cvc}
            placeholder="SECURITY CODE"
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
