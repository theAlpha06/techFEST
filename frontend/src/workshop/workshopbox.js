import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../API/api";
import "./workshopbox.css";
import {
  FaRegCalendar,
  FaRegClock,
  FaUnity,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdHotelClass } from "react-icons/md";
import ErrorModel from "../components/ErrorPopup/ErrorModel";
import AuthContext from "../auth/authContext";

function WorkshopBox({ props }) {
  const [errorMade, setErrorMade] = useState();
  const authContext = useContext(AuthContext);
  const onErrorMadeHandle = () => {
    setErrorMade(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [workshopName, setworkshopName] = useState(null);
  const [user, setUser] = useState(null);
  const handleClick = (workshop) => {
    setworkshopName(workshop.target.value);
    setAnchorEl(workshop.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  function HandleRegister() {
    if (!authContext.isUserLoggedIn) {
      setErrorMade({
        title: "Login Error",
        message: "Please login to register for the workshop",
      });
      return;
    }
    axios
      .post(
        `${baseUrl}/user/registerworkshop`,
        { workshopId: props._id },
        {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        }
      )
      .then((result) => {
        setErrorMade({
          title: result.data.title,
          message: result.data.message,
        });
        return;
      });
  }
  const closedRegistration = () => {
    setTimeout(
      () =>
        setErrorMade({
          title: "Registration Closed",
          message: "Registration for this workshop is closed",
        }),
      1000
    );
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/user/getUserById`, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        if (
          result.status !== 200 ||
          (result.status !== 201 && result.data.isError)
        ) {
          authContext.logout();
          return result.status(208).json({
            title: "Auth Error",
            message: "Wrong user auth!",
          });
        }
        setUser(result.data.user);
      });
  }, [authContext, authContext.login]);

  return (
    <>
      {errorMade && (
        <ErrorModel
          title={errorMade.title}
          message={errorMade.message}
          onErrorClick={onErrorMadeHandle}
        />
      )}

      <div className="workshopBoxSingle" key={props._id}>
        <h1 style={{ textAlign: "left", color: "white", marginBottom: "20px" }}>
          {props && props.workshopName}
        </h1>
        <div className="lt">
          <div className="LeftOfworkshopBox">
            <div className="workshopDesc" style={{ float: "left" }}>
              <p className="workshopDesc">
                {props && props.workshopDescription}
              </p>
              <div style={{ float: "left" }}>
              {props?.registrationLive === false ? (
                  <button
                    className="registerNowworkshop_closed"
                    onClick={closedRegistration}
                    style={{
                      background:""
                    }}
                  >
                    Registration Closed
                  </button>
                ) : (
                  <button
                    className="registerNowworkshop"
                    onClick={HandleRegister}
                  >
                    Register Now
                  </button>
                )}
              </div>
              <div style={{ float: "left" }}>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  Venue: {props && props.workshopVenue}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  Date: {props && props.workshopDate}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  Time: {props && props.workshopTime}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  Perks: E-certificate
                </p>
              </div>
            </div>
          </div>
          <div className="RightOfworkshopBox">
            <div className="workshop_image">
              <img
                src={`${baseUrl}/${props.workshopPhoto}`}
                className="workshopboxImgSingle"
                style={{ borderRadius: "20px" }}
                alt="."
              />
              <p style={{ fontSize: "16px", margin: "0.5rem 0" }}>
                <FaChalkboardTeacher /> Name: {props && props.profName}
              </p>
              <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                <MdHotelClass /> Designation: {props && props.profDesignation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkshopBox;
