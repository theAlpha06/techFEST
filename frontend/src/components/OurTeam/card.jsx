// eslint-disable-next-line
import React from "react";
import "./card.css";
//  import img from './laidy.jpg'
import linkedin from "./linkedin.png";

function Card(props) {
  return (
    <div class="cards cards--two">
      <img
        src={props.image}
        class="img-responsive"
        alt=""
        style={{ width: "100%", height: "100%" }}
      />
      <span class="cards--two__rect"></span>
      <span class="cards--two__tri"></span>
      <p>{props.name}</p>
      <ul class="cards__list">
        <li>{props.position}</li>
        <li>
          <p>
            <a href={props.linkedin} target="_blank" rel="noreferrer">
              <img className="Team-lnkedin-img" alt="" src={linkedin} />
            </a>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Card;
