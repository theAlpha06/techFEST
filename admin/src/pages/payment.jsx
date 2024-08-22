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
import { useCallback } from "react";

const Payment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paidUsers, setPaidUsers] = useState(null);
  const { token } = useStateContext();
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
  const validatePayment = async (id) => {
    setIsLoading(true);
    await axios.post(
      `${baseUrl}/payment/verify`, 
    {
      id,
    }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    ).then((result) => {
      setIsLoading(false);
      notify(result.data.message);
      setInterval(() => {
        window.location.reload(false);
      }, 2000)
    })
  };

  useEffect(() => {
    getPaidUsers();
  }, []);

  const getPaidUsers = async () => {
    setIsLoading(true);
    await axios.get(`${baseUrl}/user/getpaiduser`).then((result) => {
      setIsLoading(false);
      setPaidUsers(result.data.paidUsers);
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
      name: "Payment Id",
      selector: (row) => row.paymentid,
    },
    {
      name: "Payment Amount",
      selector: (row) => row.amount,
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
    {
      name: "Payment Date",
      selector: (row) => row.date,
    },
    {
      name: "Payment SS",
      selector: (row) => {
        return (
          <img
            src={`${baseUrl}/${row.image}`}
            alt="payment_image"
            onClick={() => {
              window.open(`${baseUrl}/${row.image}`);
            }}
          />
        );
      },
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status) {
          return (
            <button
              className="btn"
              onClick={() => validatePayment(row.id)}
            >
              VERIFIED
            </button>
          );
        }
        return (
          <button
            className="btn_pending"
            onClick={() => validatePayment(row.id)}
          >
            PENDING
          </button>
        );
      },
      sortable: true,
    },
  ];

  const headers = [["Id", "Amount", "Date"]];

  const actionsMemo = (
    <>
      <button
        style={{ marginRight: "50px" }}
        onClick={() =>
          downloadCSV(
            headers,
            paidUsers?.map((paidUser) => {
              const date = paidUsers.payment.paymentDate;
              const time = date.slice(11, 19);
              return {
                id: paidUser.payment.paymentId,
                amount: paidUser.payment.paymentAmount,
                date: date.slice(0, 10),
                image: paidUser.payment.paymentImage,
                status: paidUser.payment.paymentStatus,
              };
            }),
            "Paid"
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
            headers,
            paidUsers?.map((paidUser) => {
              return [
                paidUser.payment.paymentId,
                paidUser.payment.paymentAmount,
                paidUser.payment.paymentDate,
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
        PAYMENT
      </div>

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
          data={paidUsers?.map((paidUser) => {
            const date = paidUser.payment.paymentDate;
            const time = date.slice(11, 19);
            return {
              id: paidUser._id,
              name: paidUser.name,
              email:paidUser.email,
              phone: paidUser.phone,
              paymentid: paidUser.payment.paymentId,
              amount: paidUser.payment.paymentAmount,
              date: date.slice(0, 10),
              time: time,
              image: paidUser.payment.paymentImage,
              status: paidUser.payment.paymentStatus,
            };
          })}
          theme="solarized"
          // actions={[actionsMemo, actionsMemo2]}
        />
      </div>
    </>
  );
};

export default Payment;
