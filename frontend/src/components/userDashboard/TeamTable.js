import React, { useContext, useState } from "react";
import "./TeamTable.css";
import { MdDelete, MdAdd } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../API/api";
import AuthContext from "../../auth/authContext";

const TeamTable = (props) => {
  console.log(props.teamMembers);
  const authContext = useContext(AuthContext);
  const [teamMembers, setTeamMembers] = useState(props.teamMembers);
  const handleDelete = (id) => {
    axios
      .post(`${baseUrl}/team/delete`, { id }, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        if (result.data.isError) {
          alert(result.data.title);
          return;
        } else {
          const updatedTeamMembers = teamMembers.filter(
            (member) => member._id !== id
          );
          setTeamMembers(updatedTeamMembers);
        }
      })
  };

  return (
    <>
      <div className="teamcont">
        <table className="teamTable">
          <thead>
            <tr>
              <th className="teamHeader">Add Team</th>
              <th className="teamHeader">
                <button className="teamaddBtn">
                  <Link to="/addteam" state={{ leaderId: props?.leaderId }}>
                    <MdAdd className="AddBttn" />
                  </Link>
                </button>
              </th>
            </tr>
            <tr className="TableRow tableBorder">
              <th className="teamHeader">Team Name</th>
              <th className="teamHeader">Leader Name</th>
              <th className="teamHeader">Member Email - Status</th>
              <th className="teamHeader">Event</th>
              <th className="teamHeader">Action</th>
            </tr>
          </thead>
          {props.teamMembers && props.teamMembers.length > 0 && <tbody>
            {teamMembers.map((team) => (
              <tr key={team._id} className="TableRow">
                <td>{team.teamName}</td>
                <td>{team.leaderName}</td>
                <td className="memberLi">
                  {team.members.map((eachMember) => (
                    <tr
                      key={eachMember.memberId}
                      className={
                        eachMember.status ? "verifiedTxt" : "notVerifiedTxt"
                      }
                    >
                      <td>{eachMember.email} - </td>
                      <td>
                        {eachMember.status ? "Verified" : "Not Verified"}
                      </td>
                      {/* <td className="removeMembBttn">
                        <button
                          className="membDelIcon"
                        // onClick={() => handleDeleteMember(eachMember.idd)}
                        >
                          <FaTimes />
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </td>
                {/* <td>{team.eventName}</td> */}
                {team.events && team.events.length === 0 && <td>Not yet registered</td>}
                {team.events && team.events.length !== 0 && <td>Registered</td>}
                {/* {team.events && team.events.map((event) => {
                  return (
                    <td>{event.eventName}</td>
                  )
                })} */}
                <td>
                  <button
                    onClick={() => handleDelete(team._id)}
                    className="teamDelIcon"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
          {props.teamMembers.length === 0 && <tbody>No Team Created</tbody>}
        </table>
      </div>
    </>
  );
};

export default TeamTable;
