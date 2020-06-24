import React from "react";
import "./credit-card.css";

const cards = [
  {
    name: "blank",
    src:
      "https://upload.wikimedia.org/wikipedia/commons/d/df/Map-circle-grey.svg",
    alt: "unknown logo"
  },
  {
    name: "mastercard",
    src:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    alt: "mastercard"
  },
  {
    name: "visa",
    src:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Visa_2014_logo_detail.svg",
    alt: "visa"
  },
  {
    name: "dinersclub",
    src:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg",
    alt: "dinersclub"
  },
  {
    name: "americanExpress",
    src:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png",
    alt: "american express"
  }
];

const changeLogo = number => {
  let logo = {src: '', alt:''};
  // Sets logo by checking first digits
  // Mastercard
  if (/^(5[0-6])/.test(number)) {
    logo.src = cards[1].src;
    logo.alt = cards[1].alt;
    // Visa
  } else if (/^4/.test(number)) {
    logo.src = cards[2].src;
    logo.alt = cards[2].alt;
    // Dinersclub
  } else if (/^(3[689])/.test(number)) {
    logo.src = cards[3].src;
    logo.alt = cards[3].alt;
    // American Express
  } else if (/^(3[47])/.test(number)) {
    logo.src = cards[4].src;
    logo.alt = cards[4].alt;
    // Blank logo
  } else {
    logo.src = cards[0].src;
    logo.alt = cards[0].alt;
  }
  return logo;
};

const addSlashToDate = exp => {
  var split = 2;
  var arr = [];

  for (var i = 0; i < exp.length; i += split) {
    arr.push(exp.substr(i, split));
  }

  return arr.join("/");
};

export default props => {
  return (
    <div className="card-container">
      <div className={"card " + (props.isFlipped ? "is-flipped" : "")}>
        <div className="card-face-front card-face">
          <div className="card-logo">
            <img src={changeLogo(props.number).src} alt={changeLogo(props.number).alt} />
          </div>
          <div className="card-number">{props.number}</div>
          <div className="card-info">
            <div className="card-info-name">
              <div>{props.ccName ? props.ccName : "Name on card"}</div>
            </div>
            <div className="card-info-expiry">
              <div>{props.exp ? addSlashToDate(props.exp) : "valid thru"}</div>
            </div>
          </div>
        </div>
        <div className="card-face-back card-face">
          <div className="back-stripe"></div>
          <div className="security-code-stripe">
            <div className="security-code">{props.cvc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
