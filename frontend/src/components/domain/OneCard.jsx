import React from "react";
import { useNavigate } from "react-router";
function OneCard({ pic, des,title }) {
  const navigate = useNavigate();
  return (
    <div className="domainRing" onClick={()=>navigate(`/events/${title}`)}>
      <div className="outerring ">
        <div className="innerRing ">
          <div className="flip-card-back">
            <span className="domainexplore span">Explore</span>
          </div>
          <div className="flip-card-front">
            <img className="ringImage" src={pic} alt=""/>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneCard;