import React, { useEffect, useState } from "react";
import "./Electrica.css";
import EventBox from "../EventBox";
import EventBottom from "../EventBottom";
import { datasOfEvent } from "./data";
import { datasOfEventCoordinator } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Electicaevent from "../ELECTRICA1_11zon.png";
import axios from "axios";
import { baseUrl } from "../../../API/api";

const Electrica = () => {
  const [electrica, setElectrica] = useState(null);
  useEffect(() => {
    getElectrica();
  }, [])

  const getElectrica = async() => {
    await axios.post(`${baseUrl}/event/getEventByDomain`, {
      domainName: "Electrica"
    }).then((result) => {
      setElectrica(result.data.event);
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
            <img src={Electicaevent} className="event_electrica" alt="..." />
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p>
              The logic gates makes no logic until you implement it logically.
              Isn't it? Here's to the domain Electrica that brings to you the
              events that demands to work on electronic devices and circuits.
              Participate in the events and add amazing experiences.
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {electrica && electrica.map((electrica) => (
        <div className="eventsBackgroundBottom" key={electrica._id}>
          <EventBox props={electrica} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Electrica;
