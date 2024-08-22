import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API/api";
import AuthContext from "../../auth/authContext";
import "./userDash.css";
import ErrorModel from "../ErrorPopup/ErrorModel";
import { Link, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import Loader from "../Loader/Loader";
//  import { MdDelete } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import TeamTable from "./TeamTable";

// DUMMY DATA FOR TEAM MEMBERS
const User_dasbord = () => {
  const authContext = useContext(AuthContext);
  const [errorMade, setErrorMade] = useState();
  const [workshops, setWorkshops] = useState(null);
  const [events, setEvents] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const onErrorMadeHandle = () => {
    setErrorMade(null);
  };

  const onWorkshopWhatsapp = (e) => {
    // window.location.href(e)
  };
  const [user, setUser] = useState(null);
  // const [teamMembers, setTeamMembers] = useState();
  function HandlePay() {
    setErrorMade({ title: "Coming Soon", message: "Coming Soon" });
  }

  const deleteEvent = (id) => {
    setIsLoading(true);
    axios
      .post(
        `${baseUrl}/user/pullevent`,
        { id: id },
        {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        }
      )
      .then((result) => {
        setErrorMade({ title: "Success", message: result.data.message });
        setIsLoading(false);
        if (result.data.isError) {
          setErrorMade({ title: "Error", message: result.data.message });
          return;
        } else {
          const updatedEvents = events.filter((event) => event._id !== id);
          setEvents(updatedEvents);
        }
      });
  };
  const navigate = useNavigate();
  const Razorpay = useRazorpay();
  function InitiateUserPayment(amount, isOnline) {
    axios
      .post(
        `${baseUrl}/payment/userPaymentLink`,
        { userId: user._id, amount: amount * 100, isOnline: isOnline },
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
          console.error(response.error.code);
          console.error(response.error.description);
          console.error(response.error.source);
          console.error(response.error.step);
          console.error(response.error.reason);
          console.error(response.error.metadata.order_id);
          console.error(response.error.metadata.payment_id);
        });

        rzp1.open();
      });
  }
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate("/updateuser");
  };
  const commingSoon = () => {
    setErrorMade({ title: "Coming Soon", message: "Coming Soon" });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user/getUserById`, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        setIsLoading(false);
        if (!result.data) {
          authContext.logout();
          return;
        }
        setUser(result.data.user);
        setWorkshops(result.data.user.workshops);
        setTeamMembers(result.data.user.teamMembers);
        setEvents(result.data.user.events);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [authContext, authContext.login]);
  return (
    <>
      <div className="Dashboard__body">
        {isLoading && <Loader />}
        {errorMade && (
          <ErrorModel
            title={errorMade.title}
            message={errorMade.message}
            onErrorClick={onErrorMadeHandle}
          />
        )}
        <div className="row_justify-content-around">
          <div className="userdashbord_body">
            <div className="user__header">Namaste! {user && user.name}</div>
            <p className="blockquote-footer">
              {/* Your Unique tF ID is {user && user.userId} */}
            </p>
          </div>
          <div className="flex_topbox">
            <div className="card-bodytop">
              <div className="card-title text-light text-center">
                <img
                  className="idea"
                  src="https://img.icons8.com/fluency-systems-regular/48/000000/idea.png"
                  alt=""
                />

                <span className="userEvents">Events Registered</span>
              </div>

              <div className="collapse1 p-4 mt-4 mb-2">
                <div class="scrollbar" id="scrollbar-custom">
                  <table className="table_text-light">
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td>Date</td>
                        <td>Type</td>
                        <td>Whatsapp</td>
                        <td>Delete</td>
                      </tr>
                      {events && events.length === 0 && "Not registered Yet"}
                      {events &&
                        events.length > 0 &&
                        events.map((event) => {
                          const e = event.startDate.slice(0, 10);
                          return (
                            <tr key={event._id}>
                              <td>{event.eventName}</td>
                              <td>{e}</td>
                              <td>{event.eventMode}</td>
                              <td>
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`${event.whatsappLink}`}
                                >
                                  <span
                                    className="mdphone"
                                    title="Join Workshop Whatsapp Group"
                                  >
                                    <BsWhatsapp />
                                  </span>
                                </a>
                              </td>
                              <td>
                                <button
                                  // onClick={() => deleteEvent(event._id)}
                                  className="teamDelIcon"
                                >
                                  <MdDelete />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card-bodytop">
              <div className="card-title text-light text-center">
                <img
                  className="maintenance"
                  src="https://img.icons8.com/ios/50/000000/maintenance.png"
                  alt=""
                />

                <span className="userEvents">Workshops Registered</span>
              </div>
              <div className="collapse1 p-4 mt-4 mb-2">
                <div class="scrollbar" id="scrollbar-custom">
                  <table className="table_text-light">
                    <tbody>
                      <tr>
                        <td>Name </td>
                        <td>Date</td>
                        <td>Whatsapp</td>
                        <td>Delete</td>
                      </tr>
                      {workshops &&
                        workshops.length === 0 &&
                        "Not registered Yet"}
                      {workshops &&
                        workshops.length > 0 &&
                        workshops.map((workshop) => {
                          return (
                            <tr key={workshop._id}>
                              <td>{workshop.workshopName}</td>
                              <td>{workshop.workshopDate}</td>
                              <td>
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`${workshop.whatsappLink}`}
                                >
                                  <span
                                    className="mdphone"
                                    title="Join Workshop Whatsapp Group"
                                  >
                                    <BsWhatsapp />
                                  </span>
                                </a>
                              </td>
                              <td>
                                <span className="mdphone">
                                  <MdDelete />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {user && user.role == 1 && !user.payment.paymentStatus && (
            <div className="card-payment">
              <div className="card-heading">
                <h1>Pay for event mode</h1>
              </div>
              <div className="card-details">
                <p>For online mode: 299</p>
                <p>For offline mode: 599</p>
              </div>
              <div className="card-paybtn">
                {user && user.isPaid ? (
                  "Paid"
                ) : (
                  <Link to="/paymentPage" state={{ amount: 299 }}>
                    <button
                      type="button"
                      // onClick={InitiateUserPayment}
                      value="Pay"
                      className="userDash__button"
                      // onClick={() => InitiateUserPayment(299, true)}
                    >
                      Online Mode
                    </button>
                  </Link>
                )}
                {user && user.isPaid ? (
                  "Paid"
                ) : (
                  <Link to="/paymentPage" state={{ amount: 599 }}>
                    <button
                      type="button"
                      onClick={commingSoon}
                      value="Pay"
                      className="userDash__button"
                      // onClick={() => InitiateUserPayment(599, false).call}
                    >
                      Offline Mode
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
          {/* {user && user.role == 1 && <button className="userpay">PAY</button>} */}

          <div className="card-bodymid">
            <div className="dashboard_profile_container">
              <table className="profiletable">
                <tr>
                  {/* <td>
                  <div className="personal ">Personal Information</div>
                </td> */}
                  <td colspan="2">
                    <b>Personal Information</b>
                  </td>
                </tr>
                <tr className="TableRow">
                  <td>Name</td>
                  <td className="TableRow__res ">{user && user.name}</td>
                </tr>
                <tr className="TableRow">
                  <td>College Name</td>

                  <td className="TableRow__res">{user && user.collegeName}</td>
                </tr>
                <tr className="TableRow ">
                  <td>Branch</td>
                  <td className="TableRow__res">{user && user.branch}</td>
                </tr>

                <tr className="TableRow"></tr>
                {/* <tr className="TableRow ">
                <td>Year Of Study</td>
                <td className="TableRow__res">3</td>
              </tr> */}
                <tr className="TableRow  ">
                  <td>Date of Birth</td>

                  <td className="TableRow__res">
                    {user && user?.dob?.slice(0, 10)}
                  </td>
                </tr>

                {/* <!-------------------Contact Information-------------> */}

                <tr className="TableRow">
                  <td className="" colspan="2">
                    <b className="contactInfo">Contact Information</b>
                  </td>
                </tr>
                <tr className="TableRow">
                  <td className="">E-mail</td>
                  <td className="TableRow__res">{user && user.email}</td>
                </tr>
                {/* <tr className="TableRow">
                <td>Phone Number</td>
                <td className="TableRow__res">{user && user.phone}</td>
              </tr> */}
                <tr className="TableRow">
                  <td>Whatsapp Number</td>
                  <td className="TableRow__res">{user && user.phone}</td>
                </tr>
                <tr className="TableRow">
                  <td>Payment Status</td>
                  <td className="TableRow__res">
                    {user &&
                    (user.role == 2 ||
                      (user.role == 1 && user.payment.paymentStatus))
                      ? "Paid"
                      : "Not Paid"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>Edit </div>
                  </td>

                  <td colspan="2">
                    <img
                      className="editlogo"
                      src="https://img.icons8.com/external-others-inmotus-design/1x/external-Edit-virtual-keyboard-others-inmotus-design-3.png"
                      alt=""
                      onClick={handleClick}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          {teamMembers && (
            <TeamTable teamMembers={teamMembers} leaderId={user && user._id} />
          )}
        </div>
      </div>
    </>
  );
};

export default User_dasbord;
