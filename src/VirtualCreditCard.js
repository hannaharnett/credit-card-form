import React from "react";
import "./credit-card.css";

export default props => {
  return (
    <div className="credit-card">
      <div className="credit-card-logo">LOGO</div>
      <div className="credit-card-number">{props.number}</div>
      <div className="credit-card-info">
        <div className="credit-card-info-name">
          <div className="credit-card-info-name-label">CARDHOLDER'S NAME</div>
          <div>{props.cardholder}</div>
        </div>
        <div className="credit-card-info-expiry">
          <div className="credit-card-info-exiry-label">VALID UNTIL</div>
          <div>{props.exp}</div>
        </div>
      </div>
    </div>
  );
};
