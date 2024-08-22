import React, { useEffect, useState } from "react";
import "./Robozar.css";
import EventBox from "../EventBox";
import EventBottom from "../EventBottom";
import { datasOfEvent, datasOfEventCoordinator } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Robozarevent from "../ROBOZAR1_11zon.png";
import axios from "axios";
import { baseUrl } from "../../../API/api";

const Robozar = () => {

  const [robozars, setRobozars] = useState(null);
  useEffect(() => {
    getRobozar();
  }, [])

  const getRobozar = async() => {
    await axios.post(`${baseUrl}/event/geteventbydomainname`, {
      domainName: "Robozar"
    }).then((result) => {
      setRobozars(result.data.event);
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
            <img src={Robozarevent} className="event_robozar" alt="..." />
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p>
              Ever captivated by versatile activities carried out by bots
              nowadays? Ever witnessed how robots today perform it all
              innovating our agriculture? Here's to the exciting opportunities
              to showcase your skills, design a robot, enhance your skills and
              win worth cash prizes,All at the same place!
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>

      {/* EVENTS */}
      {robozars && robozars.map((robozar) => (
        <div className="eventsBackgroundBottom" key={robozar._id}>
          <EventBox props={robozar} />
        </div>
      ))}

      {/* Faculty Advisor */}

      {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))}
    </>
  );
};

export default Robozar;
