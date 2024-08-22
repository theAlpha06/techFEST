import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import axios from "axios";
import { baseUrl } from "../API/api";
import Loader from "../components/Loader/Loader";
import { useStateContext } from "../contexts/ContextProvider.js";
import { useNavigate } from "react-router-dom";

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



const Home = (props) => {
  // const { currentColor, currentMode } = useStateContext();
  // const { name, tfId } = props;
  const navigate = useNavigate();
  const { token } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [visitor, setVisitor] = useState(null);
  const [coordinator, setCoordinator] = useState(null);
  const [coor, setCoor] = useState(null)
  const [user, setUser] = useState(null);
  const [institution, setInstitution] = useState(null);
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

  const validateCoordinator = async (email, name) => {
    setIsLoading(true);
    await axios
      .post(
        `${baseUrl}/coordinator/validate`,
        {
          email,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          notify("Coordinator validated!");
          window.location.reload(false);
          // navigate('/home');
        }
      });
  };

  const deleteCoordinator = async (id) => {
    setIsLoading(true);
    await axios.post(`${baseUrl}/coordinator/delete`, { id }).then((result) => {
      setIsLoading(false);
      if (result.status === 200) {
        notify("Coordinator deleted!");
        window.location.reload(false);
        // navigate('/home');
      }
    });
  };

  useEffect( () => {
    getCoordinator();
    getUserCount();
    getVisitorCount();
    getInstitutionCount();
  }, []);
  const getInstitutionCount = async () => {
    await axios.get(`${baseUrl}/user/count/institution`).then((result) => {
      const res = result;
      setInstitution(res.data.count);
    });
  }
  const getVisitorCount = async () => {
    await axios.get(`${baseUrl}/visitors/count`).then((result) => {
      const res = result;
      setVisitor(res.data.count);
    });
  }
  const getUserCount = async () => {
    await axios.get(`${baseUrl}/user/count`).then((result) => {
      const res = result;
      setUser(res.data.count);
    });
  }
  const getCoordinator = async () => {
    await axios.get(`${baseUrl}/coordinator/get`).then((result) => {
      const res = result?.data;
      setCoordinator(res);
    });
  }
  useEffect( () => {
    getCoordinaotrById();
  }, [])
  const getCoordinaotrById = async () => {
    await axios.post(`${baseUrl}/coordinator/getById`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => {
      const res = result;
      setCoor(res.data.coordinator);
    });
  }
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "E-mail",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Domain",
      selector: (row) => row.domain,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status.toString() === "true") {
          return (
            <button
              className="btn"
              onClick={() => notify("Already validated!")}
            >
              VERIFIED
            </button>
          );
        }
        return (
          <button
            className="btn_pending"
            onClick={() => validateCoordinator(row.email, row.name)}
          >
            PENDING
          </button>
        );
      },
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="btn_delete"
          onClick={() => deleteCoordinator(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const data = [];
  coordinator?.map((item) => {
    if (item.coordinatorId !== "#TF23-018b85") {
      const coor = {
        id: item.coordinatorId,
        // srNo: item._id,
        name: item.coordinatorName,
        phone: item.coordinatorPhone,
        email: item.coordinatorEmail,
        type: item.coordinatorType,
        status: item.coordinatorStatus,
        branch: item.coordinatorBranch,
        domain: item.coordinatorDomain,
        // event: item.coordinatorEvent,
      };
      data.push(coor);
    }
  });

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

      <div className="home">
        <div className="headingHome">Namaste Admin {coor && coor.coordinatorName}!</div>
        {/* <div className="descriptionHome">Your unique tF ID is {coor && coor.coordinatorId}</div> */}
        <div className="containerHome">
          <div className="container1">
            <div className="number">{user}</div>
            <div className="num-desc">Registerations</div>
          </div>
          <div className="container2">
            <div className="number">{visitor}</div>
            <div className="num-desc">Unique Visitors</div>
          </div>
          <div className="container3">
            <div className="number">{institution}</div>
            <div className="num-desc">SLIETians</div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "auto",
          textAlign: "left",
          fontSize: "2.5em",
          margin: "0.5em",
        }}
      >
        Coordinators
      </div>
      <div
        style={{
          // border: "2px solid green",
          padding: "0.75em",
           paddingBottom:'0px',
           marginBottom:"0px",
          background: "black",
          fontSize: "40px",
        }}
      >
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          fixedHeaderScrollHeight="100%"
          highlightOnHover
        //  pagination
          theme="solarized"
        />
      </div>
    </>
  );
};

export default Home;