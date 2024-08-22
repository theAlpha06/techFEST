import React, { useEffect, useState } from "react";
import "./Mechanica.css";
import EventBox from "../EventBox";
import EventBottom from "../EventBottom";
import { datasOfEvent } from "./data";
import { datasOfEventCoordinator } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Mechanicaevent from "../MECHANICA1_11zon.png";
import { baseUrl } from "../../../API/api";
import axios from "axios";

const Mechanica = () => {
  const [mechanica, setMechanica] = useState(null);
  useEffect(() => {
    getMechanica();
  }, [])

  const getMechanica = async() => {
    await axios.post(`${baseUrl}/event/getEventByDomain`, {
      domainName: "Mechanica"
    }).then((result) => {
      setMechanica(result.data.event);
    })
  }
  return (
    <>
      <div className="background-of-EventsPage">
        <div className="eventContainer">
          <div className="insideCntiner">
            <div className="techFestTCont">
              <img src={TechFestT} className="techFestT" alt=".." />
            </div>
            <img src={Mechanicaevent} className="event_mechanica" alt="..." />
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p>
              From a system's design to its operations, Mechanica domain covers
              it all. Make yourself a part of domain Mechanica and witness
              captivating glimpses of mechanical engineering in battle.
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {mechanica && mechanica.map((mechanica) => (
        <div className="eventsBackgroundBottom" key={mechanica._id}>
          <EventBox props={mechanica} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Mechanica;
