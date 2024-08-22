import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Popover } from "@mui/material";
import { baseUrl } from "../../API/api";
import Register from "../Team/Main_Page";
import "./EventBox.css";
import {
  FaRegCalendar,
  FaRegClock,
  FaUnity,
  FaBuilding,
  FaPersonBooth,
  FaRegCalendarTimes,
} from "react-icons/fa";
import ErrorModel from "../ErrorPopup/ErrorModel";
import Razorpay from "react-razorpay";
import AuthContext from "../../auth/authContext";

function EventBox({ props }) {
  const [errorMade, setErrorMade] = useState();
  const date = props?.startDate;
  const authContext = useContext(AuthContext);
  const onErrorMadeHandle = () => {
    setErrorMade(null);
  };
  const closedRegistration = () => {
    setTimeout(
      () =>
        setErrorMade({
          title: "Registration Closed",
          message: "Registration for this event is closed",
        }),
      200
    );
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const handleClick = (event) => {
    if (!authContext.isUserLoggedIn) {
      setErrorMade({
        title: "Login Error!",
        message: "Please login to register for the event",
      });
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function InitiateUserPayment() {
    axios
      .post(
        `${baseUrl}/payment/eventPaymentLink`,
        { userId: user._id },
        {
          headers: { "content-type": "multipart/form-data" },
        }
      )
      .then((order) => {
        const options = {
          key: "rzp_test_Th21vVpHqDNa1v", // Enter the Key ID generated from the Dashboard
          currency: "INR",
          name: "techFEST SLIET",
          description: "Fee for registeration for techFEST",
          image: "https://www.techfestsliet.org/tf23.webp",
          order_id: order.data.orderId,
          handler: function (response) {
            console.log(response);
            axios
              .post(
                `${baseUrl}/payment/userPaymentVerify`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: user._id,
                  eventId: props?._id,
                },
                { headers: { "content-type": "multipart/form-data" } }
              )
              .then((resp) => console.log(resp));
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          //          notes: {
          //            address: "Razorpay Corporate Office",
          //          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      });
  }

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
  const coor_len = (props?.studentCoordinator).length;
  const onErrorHappen = () => {
    setErrorMade({ title: "Register Now", message: "Coming Soon" });
  };

  return (
    <>
      {errorMade && (
        <ErrorModel
          title={errorMade.title}
          message={errorMade.message}
          onErrorClick={onErrorMadeHandle}
        />
      )}
      {coor_len === 1 ? (
        <div className="eventBoxSingle" key={props._id}>
          <div className="LeftOfEventBox">
            <div className="evntDesc" style={{ float: "left" }}>
              <h1 style={{ textAlign: "left" }}>{props?.eventName}</h1>
              <p className="eventDesc">{props?.eventDescription}</p>
              <div style={{ float: "left" }}>
                {props?.registrationLive === false ? (
                  <button
                    className="registerNowEvent_closed"
                    onClick={closedRegistration}
                  >
                    Registration Closed
                  </button>
                ) : (
                  <button className="registerNowEvent" onClick={handleClick}>
                    Register Now
                  </button>
                )}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${props?.driveLink}`}
                >
                  <button className="problemStat">Problem Statement</button>
                </a>
              </div>
              <div style={{ float: "left" }}>
                {!props?.ePrizeWorth ? (
                  <></>
                ) : (
                  <h2 style={{ marginTop: "6px", textAlign: "left" }}>
                    Prizes Worth <br></br> &#8377;{props?.ePrizeWorth}/-{" "}
                  </h2>
                )}
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaUnity /> Event Mode : {props?.eventMode}{" "}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaRegCalendarTimes />
                  Date: {props && date.slice(0, 10)}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaPersonBooth /> Participation Type :{" "}
                  {props?.eventParticipationType}{" "}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaBuilding /> Event Venue : {props?.venue}{" "}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaRegCalendar /> Register Before 22 March<br></br>
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaRegClock /> 11:59 P.M.
                </p>
              </div>
            </div>
          </div>

          <div className="RightOfEventBox">
            <div className="objOfEventBox">
              {coor_len === 1
                ? props?.studentCoordinator?.map((cor) => {
                    return (
                      <div className="boxImage">
                        {!cor?.coordinatorPhoto ? (
                          <img
                            src="/dummy.jpg"
                            className="boxImgSingle"
                            alt="."
                          />
                        ) : (
                          <img
                            src={`${baseUrl}/${cor?.coordinatorPhoto}`}
                            className="boxImgSingle"
                            alt="."
                          />
                        )}
                        <div className="event__coordinator">
                          {" "}
                          <span> {cor.coordinatorName} </span>
                          <br></br> <span> {cor.coordinatorPhone} </span>
                          <br></br> <span> {cor.coordinatorEmail} </span>
                        </div>
                      </div>
                    );
                  })
                : props?.studentCoordinator?.map((cor) => {
                    return (
                      <div className="boxImage">
                        {/* <img src={cor.img} className='boxImgDouble' alt='.' /> */}
                        <div className="event__coordinator">
                          {" "}
                          <span> {cor.coordinatorName} </span>
                          <br></br> <span> {cor.coordinatorPhone} </span>
                          <br></br> <span> {cor.coordinatorEmail} </span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      ) : (
        <div className="eventBox" key={props._id}>
          <div className="LeftOfEventBox">
            <div className="evntDesc" style={{ float: "left" }}>
              <h1 style={{ textAlign: "left" }}>{props?.eventName}</h1>
              <p className="eventDesc">{props?.eventDescription}</p>
              <div style={{ float: "left" }}>
                {props?.registrationLive === false ? (
                  <button
                    className="registerNowEvent_closed"
                    onClick={closedRegistration}
                  >
                    Registration Closed
                  </button>
                ) : (
                  <button className="registerNowEvent" onClick={handleClick}>
                    Register Now
                  </button>
                )}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${props?.driveLink}`}
                >
                  <button className="problemStat">Problem Statement</button>
                </a>
              </div>
              <div style={{ float: "left" }}>
                {!props?.ePrizeWorth ? (
                  <></>
                ) : (
                  <h2 style={{ marginTop: "6px", textAlign: "left" }}>
                    Prizes Worth <br></br> &#8377;{props?.ePrizeWorth}/-{" "}
                  </h2>
                )}
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaUnity />
                  Event Mode : {props?.eventMode}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaRegCalendarTimes />
                  Date: {props && date.slice(0, 10)}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaPersonBooth /> Participation Type :{" "}
                  {props?.eventParticipationType}{" "}
                </p>
                <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
                  <FaBuilding />
                  Event Venue: {props?.venue}
                </p>
              </div>
            </div>
          </div>

          <div className="RightOfEventBox">
            <div className="objOfEventBox">
              {coor_len === 1
                ? props?.studentCoordinator?.map((cor) => {
                    return (
                      <div className="boxImage">
                        {!cor?.coordinatorPhoto ? (
                          <img
                            src="/dummy.jpg"
                            className="boxImgSingle"
                            alt="."
                          />
                        ) : (
                          <img
                            src={`${baseUrl}/${cor?.coordinatorPhoto}`}
                            className="boxImgSingle"
                            alt="."
                          />
                        )}
                        <div
                          style={{
                            marginLeft: "10px",
                            textAlign: "center",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          <span> {cor?.coordinatorName} </span>
                          <br></br> <span> {cor?.coordinatorPhone} </span>
                          <br></br> <span> {cor?.coordinatorEmail} </span>
                        </div>
                      </div>
                    );
                  })
                : props?.studentCoordinator?.map((cor) => {
                    return (
                      <div className="boxImage">
                        {!cor?.coordinatorPhoto ? (
                          <img
                            src="/dummy.jpg"
                            className="boxImgSingle"
                            alt="."
                          />
                        ) : (
                          <img
                            src={`${baseUrl}/${cor?.coordinatorPhoto}`}
                            className="boxImgSingle"
                            alt="."
                          />
                        )}
                        <div
                          className="event__coordinator"
                          style={{ marginLeft: "10px", fontSize: "14px" }}
                        >
                          {" "}
                          <span> {cor?.coordinatorName} </span>
                          <br></br> <span> {cor?.coordinatorPhone} </span>
                          <br></br> <span> {cor?.coordinatorEmail} </span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Register
          user={user}
          eventMode={props.eventMode}
          eventId={props._id}
          eventParticipationType={props.eventParticipationType}
        />
      </Popover>
    </>
  );
}

export default EventBox;
