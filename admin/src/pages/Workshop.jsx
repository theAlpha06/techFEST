import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Workshopadd from "../pages/Workshopadd";
import DataTable, { createTheme } from "react-data-table-component";
import { baseUrl } from "../API/api";
import { downloadCSV } from "../contexts/Csv";
import { downloadPdf } from "../contexts/exportAsPDF";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Workshops = () => {
  const [workshop, setWorkshop] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const routerParams = useParams();

  useEffect(() => {
    getWorkshopUserRegistered();
  }, []);

  const getWorkshopUserRegistered = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/workshop/workshop/${routerParams.id}`)
      .then((result) => {
        setIsLoading(false);
        const res = result.data.workshop;
        const res1 = result.data.user;
        setWorkshop(res);
        setUser(res1);
      });
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "black",
        secondary: "black",
      },
      background: {
        default: "white",
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

  const actionsMemo = React.useMemo(
    () => (
      <button
        style={{ marginRight: "50px" }}
        onClick={() => downloadCSV(data, "Workshops")}
      >
        CSV
      </button>
    ),
    []
  );
  const actionsMemo2 = React.useMemo(
    () => (
      <button onClick={() => downloadPdf(headers, Dummydata, "Workshops")}>
        PDF
      </button>
    ),
    []
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
        {workshop && workshop.workshopName}
        <p>Domain : {workshop && workshop.domainName}</p>
      </div>
      <h1
        style={{
          width: "auto",
          textAlign: "center",
          fontSize: "2.5em",
          margin: "0.5em",
        }}
      >
        User Registered
      </h1>

      <div
        style={{
          border: "2px solid green",
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
    </>
  );
};

export default Workshops;
