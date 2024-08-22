import React, { useEffect, useState } from "react";
import "./Plexus.css";
import EventBox from "../EventBox";
import { datasOfEvent, datasOfEventCoordinator } from "./data";
import EventBottom from "../EventBottom";
import TechFestT from "../techFEST23kaT.webp";
import Plexusevent from "../PLEXUS1_11zon.png";
import axios from "axios";
import { baseUrl } from "../../../API/api";

const Plexus = () => {
  const [plexus, setPlexus] = useState(null);
  useEffect(() => {
    getPlexus();
  }, []);

  const getPlexus = async() => {
    await axios.post(`${baseUrl}/event/geteventbydomain`, {
      domainName: "Plexus"
    }).then((result) => {
      setPlexus(result.data.event);
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
            <img src={Plexusevent} className="event_plexus" alt="..." />
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p>
              As Plexus is connection of nerves, our participants are stack of
              codes. Make yourself a member of Plexus Domain to analyze your
              programming skills.
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {plexus && plexus.map((plexus) => (
        <div className="eventsBackgroundBottom" key={plexus._id}>
          <EventBox props={plexus} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Plexus;
