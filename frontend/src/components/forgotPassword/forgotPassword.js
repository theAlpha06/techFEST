import "./forgotPassword.css";
import reset from "../../images/reset.png";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API/api";
import Loader from '../Loader/Loader.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [fieldErr, setFieldErr] = useState(null);
  const [mailErr, setMailErr] = useState(null);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const PostData = async (e) => {
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
    await axios.post(`${baseUrl}/auth/forgot-password`, user).then((result) => {
      const res = (result);
      setIsLoading(false);
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
        }, 3000)
      }
    });
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className="forgotPassword forgotPassword__body">
      <div className="forgotPassword__content">
        <img
          src={reset}
          alt="reset png"
          className="forgotPassword__reset-img"
        />
        <h1 className="forgotPassword__title">
          {success ? "Check your inbox" : "Forgot Password?"}
          </h1>
        <p className="forgotPassword__text">
          {success ? "Reset link has been sent to your mail! Kindly check your inbox/spam" : " No worries ! it happens, enter your E-mail and we’ll send you a reset link."}
        </p>
        {fieldErr && <p className="forgotPassword__error">{fieldErr}</p>}
        {err && <p className="forgotPassword__error">{err}</p>}
        {!success && <form method="post" className="forgotPassword__inputFields">
          <input
            placeholder="Enter your mail!"
            className="forgotPassword__input"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          {mailErr && <p className="forgotPassword__error">{mailErr}</p>}
          <button type="button" onClick={PostData} value="forgotPassword"  className="forgotPassword__button">
            Send Request
          </button>
        </form>}
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
