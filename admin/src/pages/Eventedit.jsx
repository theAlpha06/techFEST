import React, { useEffect, useState } from "react";
import "./Eventedit.css";
import axios from "axios";
import { baseUrl } from "../API/api";
import Loader from "../components/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Eventadd = () => {
  const [startDate, setStartDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [studentCoordinator1, setStudentCoordinator1] = useState("");
  const [studentCoordinator2, setStudentCoordinator2] = useState("");
  const [eventMode, setEventMode] = useState("");
  const [domainName, setDomainName] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [eventParticipationType, setEventParticipationType] = useState("");
  const [url, setUrl] = useState('')
  const [eventVenue, setEventVenue] = useState("");
  const [ePrizeWorth, setEPrizeWorth] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [coordinators, setCoordinators] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const notify = (msg) => toast.success(msg, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  useEffect(() => {
    getCoordinators();
    const cu = window.location.href;
    const myArray = cu.split('/');
    setUrl(myArray[4]);
  }, []);

  const getCoordinators = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/coordinator/get`)
      .then((result) => {
        setIsLoading(false);
        const res = result.data;
        setCoordinators(res);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }


  const postData = async () => {
    const studentCoordinator = [studentCoordinator1, studentCoordinator2];
    setIsLoading(true);
    await axios.post(`${baseUrl}/event/modify/${url}`, {
      eventName: eventName,
      eventDescription: eventDescription,
      studentCoordinator: studentCoordinator,
      eventMode: eventMode,
      whatsappLink: whatsappLink,
      eventParticipationType: eventParticipationType,
      domainName: domainName,
      driveLink: driveLink,
      eventVenue: eventVenue,
      startDate: startDate,
      ePrizeWorth: Number(ePrizeWorth),
    }).then((result) => {
      setIsLoading(false);
      const res = result;
      notify(res.data.message);
    });
  };
  return (
    <div className="eventEdit">
      <div className="eventHeader">Edit Event</div>
      {isLoading && <Loader />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="eventEditItems">
        <label>
          Domain Name :
          <select
            sx={{ height: "10px" }}
            onChange={(e) => setDomainName(e.target.value)}
            name="role"
            required
          >
            <option value="0">Select</option>
            <option value="aarambh">Aarambh</option>
            <option value="plexus">Plexus</option>
            <option value="chemfor">Chemfor</option>
            <option value="electrica">Electrica</option>
            <option value="genesis">Genesis</option>
            <option value="karyarachana">Karyarachana</option>
            <option value="kermis">Kermis</option>
            <option value="mechanica">Mechanica</option>
            <option value="robozar">Robozar</option>
          </select>
        </label>
        <label>
          Event Name :{" "}
          <input
            name="eventName"
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Event Drive Link :{" "}
          <input name="drive" onChange={(e) => setDriveLink(e.target.value)} />
        </label>
        <label>
          Event Whatsapp Link :{" "}
          <input
            name="whatsapp"
            onChange={(e) => setWhatsappLink(e.target.value)}
          />
        </label>
      </div>
      <div
        style={{  width: "auto", justifyContent: "left", textAlign: "left" }}
      >
        Event Description (max 50 words)
        <br />
        <textarea
          name="description"
          cols="40"
          rows="5"
          onChange={(e) => setEventDescription(e.target.value)}
        >
        </textarea>
      </div>

      <div className="containerEventEdit2">
        <div>
          <div className="container-head-EventEdit">Event Co-ordinator - 1</div>
          <div className="eventEditBox">
            <select
              // className={styles.signup__select}
              sx={{ height: "10px" }}
              // onMouseOver={initCoordinator}
              onChange={(e) => setStudentCoordinator1(e.target.value)}
              // id='branch'
              name="role"
              // value={branch}
              required
            >
            <option value="">Select</option>
              {coordinators?.map((item) => {
                if (item.coordinatorRole == 3924875) {
                  return (
                    <option value={item._id}>{item.coordinatorName}</option>
                  );
                }
                return <></>;
              })}
            </select>
          </div>
        </div>

        <div>
          <div className="container-head-EventEdit">Event Co-ordinator - 2</div>
          <div className="eventEditBox">
            <select
              // className={styles.signup__select}
              sx={{ height: "10px" }}
              // onMouseOver={initCoordinator}
              onChange={(e) => setStudentCoordinator2(e.target.value)}
              // id='branch'
              name="role"
              // value={branch}
              required
            >
            <option value="">Select</option>
              {coordinators?.map((item) => {
                if (item.coordinatorRole == 3924875) {
                  return (
                    <option value={item._id}>{item.coordinatorName}</option>
                  );
                }
                return <></>;
              })}
            </select>
          </div>
        </div>

        <div>
          <div
            className="container-head-EventEdit"
            style={{ marginBottom: "1.8em" }}
          >
          </div>
          <div className="eventEditBox">
            <div className="eventEditItems">
              <label>
                Date :{" "}
                <input
                  type="date"
                  name="date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
            </div>
            <div className="eventEditItems">
              <label>
                Event Mode :
                <select
                  sx={{ height: "10px" }}
                  onChange={(e) => setEventMode(e.target.value)}
                  name="role"
                  required
                >
                  <option value="0">Select</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>
            </div>
            <div className="eventEditItems">
              <label>
                Event Participation Type :
                <select
                  sx={{ height: "10px" }}
                  onChange={(e) => setEventParticipationType(e.target.value)}
                  name="role"
                  required
                >
                  <option value="0">Select</option>
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </label>
            </div>
            <div className="eventEditItems">
              <label>
                Venue :{" "}
                <input
                  name="venue"
                  onChange={(e) => setEventVenue(e.target.value)}
                />
              </label>
            </div>
            <div className="eventEditItems">
              <label>
                Prize Worth :{" "}
                <input
                  name="prize"
                  onChange={(e) => setEPrizeWorth(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn" onClick={postData}>
        Submit
      </button>
    </div>
  );
};

export default Eventadd;
