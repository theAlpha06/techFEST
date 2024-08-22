import React, { useEffect, useState } from "react";
import "./OneDomain.css";
import { datasOfWorkshop } from "../../dummy data/Workshop.js";
import { useParams } from "react-router";
import data from "../../dummy data/Domain.js";
import WorkshopBox from "../workshop/WorkshopBox";
const OneDomain = () => {
  const domainOne = useParams();
  console.log(domainOne.title);
  const [domainDetail, setDomainDetail] = useState("");
  useEffect(() => {
    data?.map((item) => {
      if (item.title === domainOne.title) {
        setDomainDetail(item);
        return true;
      }
      return false;
    });
  }, [domainOne.title]);

  return (
    <>
      <div className="background-of-EventsPage">
        <div className="eventContainer">
          <div className="insideCntiner">
            <div className="techFestTCont">
              <img
                src="/events/techFEST23kaT.webp"
                className="techFestT"
                alt=".."
              />
            </div>
            <h1> {domainOne?.title} </h1>
            <span className="whiteLine"></span>
            <button id="exploreEvents">Explore Events</button>
            <p style={{ marginTop: "3%" }}>{domainDetail.des}</p>
          </div>
        </div>
        <h1 className="evnts">EVENTS</h1>
      </div>

      {/* EVENTS */}
      <div className="eventsBackgroundBottom">
      {datasOfWorkshop.map((item, index) => (
          <WorkshopBox index={index} props={item} />
          ))}
          </div>

      {/* Faculty Advisor */}
      <div className="bg_bottom">
        <div className="fac_Container">
          <div style={{ textAlign: "center", color: "white" }}>
            <img src="/events/domainCoor.jpeg" className="dummyImg" alt=".." />
          </div>
          <div style={{ color: "white", textAlign: "center" }}>
            <b>Name of Faculty</b>
            <br></br> Faculty Advisor
          </div>
          <div className="dmnCordintor">
            <div style={{ textAlign: "center", margin: "20px" }}>
              <b> Domain Coordinator </b>
              <br></br>{" "}
              <a
                href="tel:1234567890"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                1234567890{" "}
              </a>{" "}
            </div>
            <div style={{ textAlign: "center", margin: "20px" }}>
              {" "}
              <b> Domain Coordinator </b> <br></br>{" "}
              <a
                href="tel:1234567890"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                1234567890{" "}
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneDomain;
