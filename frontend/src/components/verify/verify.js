import "./verify.css";
// import logo from "../../images/techFEST '23.webp";
import React from 'react';
import reset from "../../images/reset.png";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { baseUrl } from "../../API/api";
import Loader from '../Loader/Loader.js';

const Verify = () => {
  const [email, setEmail] = useState("");
  const [fieldErr, setFieldErr] = useState(null);
  const [mailErr, setMailErr] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const PostData = async (e) => {
    console.log("entered");
    e.preventDefault();
    if (email.trim().length === 0) {
      setFieldErr("Field should not be empty");
      setTimeout(() => {
        setFieldErr(null);
      }, 3000);
      return;
    }
    if (!email.trim().includes("@")) {
      setMailErr("Invalid Email");
      setTimeout(() => {
        setMailErr(null);
      }, 3000);
      return;
    }

    const user = {
      email: email,
    };
    setIsLoading(true);
    await axios.post(`${baseUrl}/auth/verify`, user).then((result) => {
      setIsLoading(false);
      const res = (result);
      if (res.status === 208) {
        setErr(res.data.message);
        setTimeout(() => {
          setErr(null);
        }, 3000);
      }
      else if (res.status === 200 ) {
        setSuccess(res.data.message);
        setTimeout(() => {
          setSuccess(null);
          navigate('/sign-in')
        }, 3000)
      }
    });
  };
  console.log("email",email);

  return (
    <>
    {isLoading && <Loader />}
    <div className="verify verify__body">
      {/* <div>
        <img
          src={logo}
          alt="techFestSLIET'23 logo"
          className="verify__bg"
        />
      </div> */}
      <div className="verify__content">
        <img
          src={reset}
          alt="reset png"
          className="verify__reset-img"
        />
        <h1 className="verify__title">
            {success ? "Verification link sent to your mail" : "Mail not Verified?"}
          </h1>
        <p className="verify__text">
            {success ? "Verification link sent to your mail" : "No worries ! it happens, enter your E-mail and we’ll send you a verification link."}
        
        </p>
        {fieldErr && <p className="verify__error">{fieldErr}</p>}
        {err && <p className="verify__error">{err}</p>}
        <form method="post" 
         className="verify__inputFields">
          <input
            placeholder="Enter your mail!"
            className="verify__input"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          {mailErr && <p className="verify__error">{mailErr}</p>}
          <button type="button" onClick={PostData} value="verify"  className="verify__button">
            Send Request
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Verify;
