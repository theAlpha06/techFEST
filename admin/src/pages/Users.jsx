import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../API/api";
import { Link, useNavigate } from "react-router-dom";
import Domainadd from "./Domainadd";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Loader from "../components/Loader/Loader";
import { downloadPdf } from "../contexts/exportAsPDF";
import { downloadCSV } from "../contexts/Csv";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    await axios.get(`${baseUrl}/user/getusers`).then((result) => {
      setIsLoading(false);
      const res = result?.data.user;
      setUsers(res);
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
    "dark",
  );

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
  ];

  const data = [];
  users?.map((user) => {
    const coor = {
      id: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    data.push(coor);
  });
  const headers = [["Id", "Name", "Email", "Phone"]];
  const UserData = users?.map((
    elt,
  ) => [elt.userId, elt.name, elt.email, elt.phone]);

  // const actionsMemo = React.useMemo(
  //   () => (
  //     <button
  //       style={{ marginRight: "50px" }}
  //       onClick={() => downloadCSV(data, "Users")}
  //     >
  //       CSV
  //     </button>
  //   ),
  //   []
  // );
  console.log(users);
  const actionsMemo = (
    <>
      <button
        style={{ marginRight: "50px" }}
        onClick={() =>
          downloadCSV(
            users?.map((elt) => {
              return {
                id: elt.userId,
                name: elt.name,
                email: elt.email,
                phone: elt.phone,
              };
            }),
            "Users",
          )}
      >
        CSV
      </button>
    </>
  );
  const actionsMemo2 = (
    <>
      <button
        onClick={() => {
          downloadPdf(
            [["Id", "Name", "Email", "Phone"]],
            users?.map((elt) => [elt.userId, elt.name, elt.email, elt.phone]),
            "Users",
          );
        }}
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
        Users
      </div>

      <div
        style={{
          padding: "0.75em",
          borderRadius: "15px",
          fontSize: "40px",
          background:"black"
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          // pagination
          theme="solarized"
          actions={[actionsMemo, actionsMemo2]}
          highlightOnHover
        />
      </div>
    </>
  );
};

export default Users;
