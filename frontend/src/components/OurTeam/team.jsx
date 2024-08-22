// import React from "react";
//  import "./card.css"
import Card from "./card";
import "./card.css";
import Details from "./data.js";
import WebDetails from "./webteamdata.js";
import { ChairmanData } from "./ViceChairmanData";
import { ViceChairmanData } from "./ViceChairmanData";
function team() {
  return (
    <div className="card__collection  clear-fix ">
      <h1 className="team-names">Chairman</h1>
      {ChairmanData.map((detail) => (
        <Card
          image={detail.image}
          name={detail.name}
          position={detail.position}
          linkedin={detail.linkedin}
        />
      ))}

      <h1 className="team-names">Vice Chairman</h1>
      {ViceChairmanData.map((detail) => (
        <Card
          image={detail.image}
          name={detail.name}
          position={detail.position}
        />
      ))}

      <h1 className="team-names">Core Team</h1>
      {Details.map((detail) => (
        <Card
          image={detail.image}
          name={detail.name}
          position={detail.position}
          linkedin={detail.linkedin}
        />
      ))}

      <h1 className="team-names">Web Development Team</h1>

      {WebDetails.map((WebDetail) => (
        <Card
          image={WebDetail.image}
          name={WebDetail.name}
          position={WebDetail.position}
          linkedin={WebDetail.linkedin}
        />
      ))}
    </div>
  );
}

export default team;
