import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddTeam.css";
import axios from "axios";
import { baseUrl } from "../../API/api";
import AuthContext from "../../auth/authContext";
import Loader from "../Loader/Loader";

const AddTeam = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [eventType, setEventType] = useState();
  const [members, setMembers] = useState([{ id: "", name: "", email: "" }]);
  const [memberResults, setMemberResults] = useState();
  const [mailErr, setMailErr] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };
  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };
  const checkEmail = async (email, idx) => {
    const memberDomain = email.split("@")[1];
    const userDomain = authContext.userRole;
    //1 gmail
    if (
      (userDomain == 2 && memberDomain != "sliet.ac.in") ||
      (userDomain == 1 && memberDomain == "sliet.ac.in")
    ) {
      alert("Not compatible, please remove the uncompatible user!");
      return;
    }
    if (email) {
      await axios
        .post(`${baseUrl}/user/checkVericationByMail`, { email }, {
          headers: {
            Authorization: "Bearer " + authContext.token,
          }})
        .then((result) => {
          if (result.data.isError) {
            const list = mailErr;
            while (list.length < idx + 1) {
              list.push("");
            }
            list[idx] = result.data.title;
            setMembers(list);
            return;
          } else {
            if (!result.data.isVerified) {
              const list = mailErr;
              while (list.length < idx + 1) {
                list.push("");
              }
              list[idx] = "Email is not verified";
              setMembers(list);
              return;
            }
             if (!result.data.payment.paymentStatus) {
              const list = mailErr;
              while (list.length < idx + 1) {
                list.push("");
              }
              list[idx] = "Registeration fee has not been paid";
              setMembers(list);
              return;
            } else {
              const list = mailErr;
              list[idx] = "";
              setMembers(list);
            }
          }
        });
    }
  };
  const searchUsers = async (data) => {
    await axios
      .post(`${baseUrl}/user/searchByName`, { name: data })
      .then((e) => {
        setMemberResults(e.data);
      });
  };
  /*
  const SetFields = (event, index) => {
    const { name, value } = event.target;
    const list = [...members];
    list[index]["id"] = memberResults[0]["_id"];
    list[index]["email"] = memberResults[0]["email"];
    console.log(list[index]);
    setMembers(list);
  };*/
  const handleMemberChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...members];
    list[index][name] = value;
    setMembers(list);
  };

  const handleAddMember = () => {
    setMembers([...members, { id: "", name: "", email: "" }]);
  };

  const handleRemoveMember = (index) => {
    const list = [...members];
    list.splice(index, 1);
    setMembers(list);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const err of mailErr) {
      if (err.length > 0) {
        return;
      }
    }
    // Handle form submission here
    var form = new FormData(document.querySelector("form"));
    let formData = { teamName: form.teamName, members: [] };
    let member = {};
    for (const e of form) {
      switch (e[0]) {
        case "email":
          member.email = e[1];
          formData.members.push(member);
          member = {};
          break;
        case "teamName":
          formData.teamName = e[1];
          break;
        case "eventType":
          formData.eventType = e[1];
          break;
        default:
          continue;
      }
    }
    setIsLoading(true);
    axios.post(`${baseUrl}/team/create`, formData,{
      headers: {
        Authorization: "Bearer " + authContext.token,
      },
    }).then((result) => {
      setIsLoading(false);
      if (result.data.isError) {
        alert(result.data.title);
        return;
      } else {
        // alert("Team added successfully");
        navigate("/user-dashboard");
      }
    });
  };

  return (
    <>
      <div className="addTeamBg">
      {isLoading && <Loader />}
        <div className="addTeamCont">
          <div className="addTeamBox">
            <h1 style={{textAlign: "center", marginBottom: "1rem"}}>Add Team</h1>
            <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
              <div>
                <label htmlFor="teamName" className="addTeamlabel">
                  Team Name:
                </label>{" "}
                <br></br>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={teamName}
                  onChange={handleTeamNameChange}
                  className="addTeamInput"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="addTeamlabel">
                  Event Type:
                </label>{" "}
                <select
                  type="dropdown"
                  id="eventType"
                  name="eventType"
                  value={eventType}
                  onChange={handleEventTypeChange}
                  className="eventTypeInput"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="addTeamlabel">Members:</label>
                {members?.map((member, index) => (
                  <div key={index} className="memberDetails">
                    {/* <input
                     type="text"
                      name="id"
                      value={member.id}
                      onChange={(event) => handleMemberChange(event, index)}
                      placeholder="Member ID"
                  className="addTeamInput"
                    /> 
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => searchUsers(e.target.value)}
                      placeholder="Member Name"
                      list="members"
                  className="addTeamInput"
                    />
		    <datalist id="members">
		    {memberResults?.map((m) => {return <option value={m.name} />})}
		    </datalist>*/}
                    <input
                      type="email"
                      name="email"
                      value={member.email}
                      onBlur={(e) => checkEmail(e.target.value, index)}
                      onChange={(event) => handleMemberChange(event, index)}
                      placeholder="Member Email"
                      className="addTeamInput"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="removememb"
                    >
                      <FaTimes />
                    </button>
                    {mailErr[index] && (
                      <p style={{ color: "red" }}>{mailErr[index]}</p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="addTeamBttn"
                >
                  Add Member
                </button>
              </div>
              <button type="submit" className="addTeamBttn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeam;
