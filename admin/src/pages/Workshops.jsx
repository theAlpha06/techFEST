import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Workshopadd from "../pages/Workshopadd";
import DataTable, { createTheme } from "react-data-table-component";
import { baseUrl } from "../API/api";
import { downloadCSV } from "../contexts/Csv";
import { downloadPdf } from "../contexts/exportAsPDF";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { useStateContext } from "../contexts/ContextProvider";
import { toast, ToastContainer } from "react-toastify";

const Workshops = () => {
  const [workshops, setWorkshops] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { coordinatorLoggedIn, role } = useStateContext();
  const notify = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    getWorkshops();
  }, []);
  const getWorkshops = async () => {
    setIsLoading(true);
    await axios.get(`${baseUrl}/workshop/workshops`).then((result) => {
      setIsLoading(false);
      const res = result?.data.workshops;
      setWorkshops(res);
    });
  };
  const toggleRegistration = async (id) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/workshop/toggleregistration`, { id })
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          notify(result.data.message);
          setTimeout(() => {
            window.location.reload(false);
          }, 2000);
        }
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
      name: "iD",
      selector: (row) => row.id,
    },
    {
      name: "Workshop Name",
      selector: (row) => row.workshopName,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Domain",
      selector: (row) => row.domain,
    },
    {
      name: "Venue",
      selector: (row) => row.venue,
    },
    {
      name: "View",
      cell: (row) => (
        <button
          className="btn"
          onClick={() => {
            navigate(`/workshop/${row.id}`);
          }}
        >
          View
        </button>
      ),
    },
    {
      name: "Registration",
      cell: (row) => {
        if (role === 3924875) {
          if (row.registration) {
            return <button className="btn">LIVE</button>;
          }
          return <button className="btn_delete">CLOSED</button>;
        } else {
          if (row.registration) {
            return (
              <button
                className="btn"
                onClick={() => toggleRegistration(row.id)}
              >
                LIVE
              </button>
            );
          }
          return (
            <button
              className="btn_delete"
              onClick={() => toggleRegistration(row.id)}
            >
              CLOSED
            </button>
          );
        }
      },
    },
  ];

  const headers = [["Id", "Workshop Name", "Domain", "Date", "Time", "Venue"]];

  const actionsMemo = (
    <>
      <button
        style={{ marginRight: "50px" }}
        onClick={() =>
          downloadCSV(
            workshops?.map((workshop) => {
              return {
                id: workshop._id,
                workshopName: workshop.workshopName,
                venue: workshop.workshopVenue,
                time: workshop.workshopTime,
                date: workshop.workshopDate,
                domain: workshop.domainName,
                registration: workshop.registrationLive,
              };
            }),
            "Workshops"
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
        onClick={() => {
          downloadPdf(
            [["Id", "Workshop Name", "Domain", "Date", "Time", "Venue"]],
            workshops?.map((workshop) => {
              return [
                workshop._id,
                workshop.workshopName,
                workshop.domainName,
                workshop.workshopDate,
                workshop.workshopTime,
                workshop.workshopVenue,
              ];
            }),
            "Workshops"
          );
        }}
      >
        PDF
      </button>
    </>
  );
  return (
    <>
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
        WORKSHOPS LIST
      </div>
      {coordinatorLoggedIn && role == 892348 && (
        <div
          style={{
            fontSize: "18px",
            border: "2px solid blue",
            display: "table",
            margin: "5px auto",
            padding: "5px",
            borderRadius: "8px",
          }}
        >
          <Link to="/workshopadd">
            <button type="button">Add New Workshop</button>
          </Link>
        </div>
      )}
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
          data={workshops?.map((workshop) => {
            return {
              id: workshop._id,
              workshopName: workshop.workshopName,
              venue: workshop.workshopVenue,
              time: workshop.workshopTime,
              date: workshop.workshopDate,
              domain: workshop.domainName,
              registration: workshop.registrationLive,
            };
          })}
          //pagination
          theme="solarized"
          actions={[actionsMemo, actionsMemo2]}
        />
      </div>
    </>
  );
};

export default Workshops;
