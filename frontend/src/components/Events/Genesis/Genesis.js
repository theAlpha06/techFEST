import React, { useEffect, useState } from "react";
import "./Genesis.css";
import EventBox from "../EventBox";
import EventBottom from "../EventBottom";
import { datasOfEvent } from "./data";
import { datasOfEventCoordinator } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Genesisevent from "../GENESIS1_11zon.png";
import { baseUrl } from "../../../API/api";
import axios from "axios";

const Genesis = () => {
  const [genesis, setGenesis] = useState(null);
  useEffect(() => {
    getGenesis();
  }, [])

  const getGenesis = async() => {
    await axios.post(`${baseUrl}/event/getEventByDomain`, {
      domainName: "Genesis"
    }).then((result) => {
      setGenesis(result.data.event);
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
            <img src={Genesisevent} className="event_Genesis" alt="..." />
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p>
              The outstanding ones are those who do not limit themselves to a
              point and keep on triggering to create better. Make yourself a
              part of Genesis Domain and witness young yet second to none
              entrepreneurs presenting extraordinary ideas.
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {genesis && genesis.map((genesis) => (
        <div className="eventsBackgroundBottom" key={genesis._id}>
          <EventBox props={genesis} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Genesis;
