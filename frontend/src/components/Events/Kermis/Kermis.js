import React, { useEffect, useState } from "react";
import "./Kermis.css";
import EventBox from "../EventBox";
import EventBottom from "../EventBottom";
import { datasOfEvent } from "./data";
import { datasOfEventCoordinator } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Kermisevent from "../KERMIS1_11zon.png";
import { baseUrl } from "../../../API/api";
import axios from "axios";

const Kermis = () => {
  const [kermis, setKermis] = useState(null);
  useEffect(() => {
    getKermis();
  }, [])

  const getKermis = async() => {
    await axios.post(`${baseUrl}/event/getEventByDomain`, {
      domainName: "Kermis"
    }).then((result) => {
      setKermis(result.data.event);
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
            <img src={Kermisevent} className="event_kermis" alt="..." />
            <span className="whiteLine"></span>
            <button id="exploreEvents"><a href="#events">Explore Events</a></button>
            <p>
              Game is all fun and technology is all knowledge! What a perfect
              and fascinating blend they together make. Right? Participate in
              our gaming event and win fancy cash prizes.
            </p>
          </div>
        </div>
      </div>
      <div className="events" id="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {kermis && kermis.map((kermis) => (
        <div className="eventsBackgroundBottom" key={kermis._id}>
          <EventBox props={kermis} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Kermis;
