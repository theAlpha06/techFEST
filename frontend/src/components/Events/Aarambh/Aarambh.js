import React, { useEffect, useState } from "react";
import "./Aarambh.css";
import EventBoxAarambh from "../EventBoxAarambh";
import EventBottom from "../EventBottom";
import { datasOfEvent } from "./data";
import TechFestT from "../techFEST23kaT.webp";
import Aarambhevent from "../AARAMBH_11zon.png";
import axios from "axios";
import { baseUrl } from "../../../API/api";
import EventBox from "../EventBox";

const Aarambh = () => {
  const [Aarambh, setAarambh] = useState(null);
  useEffect(() => {
    getAarambh();
  }, [])

  const getAarambh = async() => {
    await axios.post(`${baseUrl}/event/getEventByDomain`, {
      domainName: "Aarambh"
    }).then((result) => {
      setAarambh(result.data.event);
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

            <img src={Aarambhevent} className="event_Aarambh" alt="..." />

            <span className="whiteLine"></span>
            <button id="exploreEvents" className="explore__events">
              Explore Events
            </button>
            <p>
              Great things aren't just there, there's a sweet beginning that
              will finally leads to the grand scheme of events. And so we bring
              you sweet starting events - Arambh. Here you'll find the prefest
              events that will make get you pull up your socks.
            </p>
          </div>
        </div>
      </div>
      <div className="events">
        <h1 className="evnts">EVENTS</h1>
        <button className="evnts_detail"><a href="https://drive.google.com/file/d/19mpychbXd9eMevtkgVOM5KJyasahBXun/view?usp=share_link" rel="noreferrer" target='_blank'>Event Details</a></button>
      </div>
      {datasOfEvent.map((item, index) => (
        <div className="eventsBackgroundBottomAarambh" key={index}>
          <EventBoxAarambh props={item} index={index} />
        </div>
      ))}
      {Aarambh && Aarambh.map((Aarambh) => (
        <div className="eventsBackgroundBottom" key={Aarambh._id}>
          <EventBox props={Aarambh} />
        </div>
      ))}
      {/* {datasOfEventCoordinator.map((item) => (
        <EventBottom props={item} />
      ))} */}
    </>
  );
};

export default Aarambh;
