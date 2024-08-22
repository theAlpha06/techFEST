import { Popover } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddMember from "./AddMember";
import "./mainPage.css";
import img from "./user.png";
import { members } from "./members.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModel from "../ErrorPopup/ErrorModel";
import Loader from "../Loader/Loader.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../API/api.js";
import AuthContext from "../../auth/authContext.js";

const Main_Page = (props) => {
  const notify = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const [errorMade, setErrorMade] = useState();
  const onErrorMadeHandle = () => {
    setErrorMade(null);
  };
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [teams, setTeams] = useState();
  const [modeErr, setModeErr] = useState(null);
  const [membersList, setMembersList] = useState([]);
  const handleClick = () => {
    navigate("/user-dashboard");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showHide = (event) => {
    setToggle(event.target.value);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    setMembersList(members);
  }, [membersList]);

  useEffect(() => {
    getProperTeam();
  }, []);

  const getProperTeam = async () => {
    await axios
      .get(`${baseUrl}/team/properteam`, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        setTeams(result.data.teams);
        return;
      });
  };

  const PostData = async () => {
    if (type === "" || type === "0") {
      setModeErr("Please choose participation type");
      setTimeout(() => {
        setModeErr(null);
      }, 3000);
      return;
    }
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/user/addevent`,
        {
          eventId: props.eventId,
          type: type,
        },
        {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        }
      )
      .then((result) => {
        setIsLoading(false);
        notify(result.data.title);
        return;
      });
  };

  return (
    <div>
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
      {errorMade && (
        <ErrorModel
          title={errorMade.title}
          message={errorMade.message}
          onErrorClick={onErrorMadeHandle}
        />
      )}
      <div className="Mainlist-father">
        <div className="Mainlist-son">
          {/* <span className="crossButton">X</span> */}
          <span className="Mainlist-content">
            <div className="Mainlist-top2">
              {{ modeErr } && <p style={{ color: "red" }}>{modeErr}</p>}
              <select
                className="Mainlist_select"
                onChange={(e) => {
                  setType(e.target.value);
                  showHide(e);
                }}
              >
                <option value="0">Choose Participation Type</option>

                {props &&
                  (props.eventParticipationType === "Individual" ||
                    props.eventParticipationType === "Hybrid") && (
                    <option value="Individual">Individual</option>
                  )}
                {props &&
                  (props.eventParticipationType === "Hybrid" ||
                    props.eventParticipationType === "Team") &&
                  teams &&
                  teams?.map((team) => {
                    return <option value={team._id}>{team.teamName}</option>;
                  })}
              </select>
            </div>
          </span>
          <div></div>

          <div className="addTEamDiv">
                <span style={{ padding: "10px", fontSize: "16px" }}>
                  Add Team
                </span>
                <Link to="/addteam">
                  <img
                    className="Mainlist-addmemberimg"
                    src={img}
                    alt=""
                    width="50"
                    height="50"
                    cursor="pointer"
                    onClick={handleClick}
                  ></img>
                </Link>
              </div>

          <button type="button" className="Mainlist-button" onClick={PostData}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default Main_Page;
