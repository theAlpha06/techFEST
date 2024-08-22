import React from "react";
import "./paymentPage.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../auth/authContext";
import { baseUrl } from "../../API/api";
import axios from "axios";
import { useLocation } from "react-router";
import Loader from "../Loader/Loader.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transaction = () => {
  const authContext = useContext(AuthContext);
  const [paymentId, setPaymentId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const amount = location.state.amount;
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
  const HandleSubmit = () => {
    const paymentData = new FormData();
    paymentData.append("userId", user._id);
    paymentData.append("paymentId", paymentId);
    paymentData.append("paymentAmount", amount);
    paymentData.append("paymentPhoto", screenshot);
    setIsLoading(true);
    axios
      .post(`${baseUrl}/payment/submit`, paymentData, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        setIsLoading(false);
        notify("Success! Kindly wait for your payment verification.");
      });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/user/getUserById`, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        if (
          result.status !== 200 ||
          (result.status !== 201 && result.data.isError)
        ) {
          authContext.logout();
          return result.status(208).json({
            title: "Auth Error",
            message: "Wrong user auth!",
          });
        }
        setUser(result.data.user);
      })
      .catch((err) => {
        return err.status(208).json({
          title: "Auth Error",
          message: "Wrong user auth!",
        });
      });
  }, [authContext, authContext.login]);
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
      {/* <h1>vsdv</h1> */}
      <div className="transactionwrapper">
        <div className="transaction-heading">Payment Details</div>
        <div className="transactioncontainer">
          <div className="transaction-data">Account No : 5355598179</div>
          <div className="transaction-data">IFSC Code : CBIN0283105</div>
          <div className="transaction-data">
            Bank Holder Name : SANT LONGOWAL INSTITUTE OF ENGG AND TECHNOLOGY
          </div>
          <div className=" inputelements transaction-data transaction-ammount">
            <div className="transaction-data transaction-data-ammount">
              Amount : ₹{amount}
            </div>
          </div>
          <div className=" inputelements transaction-data transaction-ammount">
            <div className="transaction-data transaction-data-ammount">
              Payment ID :
            </div>
            <div>
              <input
                type="text"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                className="transaction-ammount-input"
                name="paymentID"
              ></input>
            </div>
          </div>

          <div className="inputelements transaction-data transaction-ammount">
            <div className="transaction-data transaction-data-ammount">
              Payment Screenshot :
            </div>
            <div>
              <input
                className="screenshot-input"
                name="paymentScreenshot"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setScreenshot(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="transaction-btn" onClick={HandleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
