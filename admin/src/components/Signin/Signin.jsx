import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signin.module.css";
import { baseUrl } from "../../API/api";
import { useStateContext } from "../../contexts/ContextProvider";
import Loader from "../Loader/Loader.jsx";

const Signin = () => {
  const { loginHandler } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMade, setErrorsMade] = useState();
  const [fieldErr, setFieldErr] = useState(null);
  const [mailErr, setMailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const navigate = useNavigate();

  const coordinatorLoginHandle = async (authData) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/coor/sign-in`, authData)
      .then((result) => {
        setIsLoading(false);
        const res = result;
        if (res.status === 208) {
          setPasswordErr(res.data.message);
          setTimeout(() => {
            setPasswordErr(null);
            if (res.data.message.includes("registered")) {
              navigate("/sign-up");
            }
          }, 3000);
          return;
        }
        if (res.status === 200) {
          const coordinatorData = {
            token: res.data.token,
            coordinatorId: res.data.coordinatorId,
            coordinatorRole: res.data.coordinatorRole,
            coordinatorDomain: res.data.coordinatorDomain,
          };
          //console.log("ddgz",coordinatorData);
          loginHandler(coordinatorData);
          navigate("/");
        } else {
          setErrorsMade(res.data.message);
        }
      })
      .catch((err) => {
        setErrorsMade(err.message);
        setTimeout(() => {
          setErrorsMade(null);
        }, 3000);
      });
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setFieldErr("Field should not be empty");
      setTimeout(() => {
        setFieldErr(null);
      }, 3000);
      return;
    }
    if (!email.trim().includes("@")) {
      setMailErr("Invalid mail!");
      setTimeout(() => {
        setMailErr(null);
      }, 3000);
      return;
    }
    const coordinator = {
      email,
      password,
    };
    setIsLoading(true);
    coordinatorLoginHandle(coordinator);
  };

  return (
    <div className={styles.signin__content} style={{ height: "100vh" }}>
      {isLoading && <Loader />}
      {/* <div>
        <img src="techFEST'23.webp" alt="techFest'23" className={styles.signin__logo} />
      </div> */}
      <div className={styles.signin__page}>
        {errorsMade && <p style={{ color: "red" }}>{errorsMade}</p>}
        <form
          method="post"
          onSubmit="return myFormValidation()"
          className={styles.signin__inputFields}
          action=""
        >
          <h1 className={styles.signin__title}>Welcome Back!</h1>
          <p className={styles.signin__text}>Sign in to continue</p>
          {fieldErr && <p style={{ color: "red" }}>{fieldErr}</p>}
          {password && <p style={{ color: "red" }}>{passwordErr}</p>}
          <label htmlFor="email" className={styles.signin__label}>
            {mailErr && <p style={{ color: "red" }}>{mailErr}</p>}
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <label htmlFor="password" className={styles.signin__label}>
            Password
          </label>
          <input
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            autoComplete="off"
          />
          <div className={styles.signin__div}>
            <button
              className={styles.signin__button}
              value="signIn"
              type="button"
              onClick={PostData}
              disabled={isLoading}
            >
              Sign In
            </button>
            {/* <Link to="/forgot-password">Forgot Password?</Link> */}
          </div>
          {/* </div> */}
        </form>
        <p className={styles.signin__text}>
          Don&apos;t have an account?
          <Link to="/sign-up">
            <span className={styles.signin__link}>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signin;
