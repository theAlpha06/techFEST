import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import { baseUrl } from "../API/api";
import { downloadCSV } from "../contexts/Csv";
import { downloadPdf } from "../contexts/exportAsPDF";
import ReactToPrint from "react-to-print";
import axios from "axios";
import "./eventusers.css";
import Loader from "../components/Loader/Loader";
import TeamUsers from './teamusers.jsx';

const Eventusers = () => {
  const componentRef = useRef();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [user1, setUser1] = useState(null);
  const [members, setMembers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const routerParams = useParams();

  useEffect(() => {
    getEventData();
  }, []);
  const getEventData = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/event/event/${routerParams.id}`)
      .then((result) => {
        setIsLoading(false);
        const res = result.data.event;
        const res1 = result.data.event.individual;
        const res2 = result.data.event.teams;
        setEvent(res);
        setUser(res1);
        setUser1(res2);
        setMembers(res2[0].members);
      });
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "white",
        secondary: "white",
      },
      background: {
        default: "black",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.userName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
    },
  ];

  const data = [];
  user?.map((user) => {
    const work = {
      userName: user.name,
      email: user.email,
      phone: user.phone,
      branch: user.branch,
    };
    return data.push(work);
  });

  const headers = [["User Name", "Email", "Phone", "Branch"]];
  const Dummydata = data.map((elt) => [
    elt.userName,
    elt.email,
    elt.whatsapp,
    elt.branch,
  ]);

  const actionsMemo = (
    <>
      <button
        style={{ marginRight: "50px" }}
        onClick={() =>
          downloadCSV(
            user?.map((user) => {
              return {
                Name: user.name,
                Email: user.email,
                Phone: user.phone,
                Branch: user.branch,
              };
            }),
            "Users"
          )
        }
      >
        CSV
      </button>
    </>
  );
  const actionsMemo2 = (
    <>
      <button
        onClick={() =>
          downloadPdf(
            headers,
            user?.map((user) => [
              user.name,
              user.email,
              user.phone,
              user.branch,
            ]),
            `Users`
          )
        }
      >
        PDF
      </button>
    </>
  );
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="container"
        style={{
          width: "auto",
          textAlign: "center",
          fontSize: "2.5em",
          margin: "0.5em",
        }}
      >
        <p>Domain : {event && `${event.domainName}`.toUpperCase()}</p>
        <p>Event: {event && event.eventName}</p>
      </div>
      <h1
        style={{
          width: "auto",
          textAlign: "center",
          fontSize: "2em",
          margin: "0.5em",
        }}
      >
        User Registered Individually
      </h1>
      <div
        style={{
          // border: "2px solid green",
          padding: "0.75em",
          borderRadius: "15px",
          background: "black",
          fontSize: "40px",
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          pagination
          theme="solarized"
          actions={[actionsMemo, actionsMemo2]}
        />
      </div>
      <h1
        style={{
          width: "auto",
          textAlign: "center",
          fontSize: "2em",
          margin: "0.5em",
        }}
      >
        User Registered in Team
      </h1>
        <ReactToPrint 
          trigger={() => <button className="btn" style={{
            width: "auto",
            position:'relative',
            left:'50%',
            transform:'translateX(-50%)',
            textAlign: "center",
            margin: "0.5em",
          }}>Print</button>}
          content={() => componentRef.current}
        />
        <TeamUsers teams={user1} ref={componentRef}/>
    </>
  );
};

export default Eventusers;
