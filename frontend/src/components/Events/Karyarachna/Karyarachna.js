import React, { useEffect, useState } from "react";
import "./Karyarachna.css";
import EventBox from "../EventBox";
import EventBottom from "../EventBottom";
import { datasOfEvent } from "./data";
import { datasOfEventCoordinator } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Karyarachnaevent from "../KARYARACHNA1_11zon.png";
import axios from "axios";
import { baseUrl } from "../../../API/api";

const Karyarachna = () => {
  const [karyarachna, setKaryarachna] = useState(null);
  useEffect(() => {
    getKaryarachna();
  }, [])

  const getKaryarachna = async() => {
    await axios.post(`${baseUrl}/event/getEventByDomain`, {
      domainName: "Karyarachna"
    }).then((result) => {
      setKaryarachna(result.data.event);
    })
  }
  return (
    <>
      <div className="background-of-EventsPage">
        <div className="eventContainer">
          <div className="insideCntinerKarya">
            <div className="techFestTCont">
              <img src={TechFestT} className="techFestT" alt=".." />
            </div>
            <img
              src={Karyarachnaevent}
              className="event_karyarachna"
              alt="..."
            />
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p>
              The most efficient step to transformation is to start from right
              where you're. Think of solution ideas for problems such as stubble
              burning, lack of proper access to technology to farmers and many
              more, instances of which you see observe quite often. Execute
              these ideas and participate in our event and win worth cash
              prizes.
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {karyarachna && karyarachna.map((karyarachna) => (
        <div className="eventsBackgroundBottom" key={karyarachna._id}>
          <EventBox props={karyarachna} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Karyarachna;
