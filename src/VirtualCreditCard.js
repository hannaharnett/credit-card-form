import React from "react";
import "./credit-card.css";

//const cards = {
//    3: "Travel/entertainment cards (e.g. American Express and Diners Club)",
//4: "Visa",
//5: "MasterCard",
//6: "Discover Card"
//}

export default props => {
  return (
    <div className="credit-card">
      <div className="credit-card-logo">LOGO</div>
      <div className="credit-card-number">{props.number}</div>
      <div className="credit-card-info">
        <div className="credit-card-info-name">
          <div className="credit-card-info-name-label">NAME HERE</div>
          <div>{props.name}</div>
        </div>
        <div className="credit-card-info-expiry">
          <div className="credit-card-info-exiry-label">VALID UNTIL</div>
          <div>{props.exp}</div>
        </div>
      </div>
    </div>
  );
};
