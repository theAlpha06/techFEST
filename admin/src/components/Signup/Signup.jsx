import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../API/api.js";
import styles from "./Signup.module.css";
import Loader from "../Loader/Loader.jsx";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("0");
  const [branch, setBranch] = useState("0");
  const [confirmErr, setConfirmErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMade, setErrorsMade] = useState(null);
  const [fieldErr, setFieldErr] = useState(null);
  const [branchErr, setBranchErr] = useState(null);
  const [mailErr, setMailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);
  const [typeErr, setTypeErr] = useState(null);
  const [divOne, setDivOne] = useState(true);
  const [divTwo, setDivTwo] = useState(false);
  const [toggle, setToggle] = useState(null);
  const [domain, setDomain] = useState(null);
  // const [errorMade, setErrorMade] = useState();

  // const onErrorMadeHandle = () => {
  //   setErrorMade(null);
  // };

  const showHide = (event) => {
    setToggle(event.target.value);
  };

  const stringArray = name.split(/(\s+)/);
  const navigate = useNavigate();

  const handleConfirm = (value) => {
    setCPassword(value);
    if (!(value === password)) {
      setConfirmErr("Password should match");
    } else {
      setConfirmErr(null);
      return true;
    }
    return false;
  };

  const showDivTwo = () => {
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      cPassword.trim().length === 0
    ) {
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
    if (password.length < 5) {
      setPasswordErr("Atleast five characteres!");
      setTimeout(() => {
        setPasswordErr(null);
      }, 3000);
      // return;
    } else {
      setDivOne(false);
      setDivTwo(true);
    }
  };
  const showDivOne = () => {
    setDivOne(true);
    setDivTwo(false);
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      cPassword.trim().length === 0 ||
      phone.trim().length === 0 ||
      branch.valueOf === 0
    ) {
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
    if (branch === '0') {
      setBranchErr('Please choose your branch');
      setTimeout(() => {
        setBranchErr(null);
      }, 3000);
      return;
    }
    if (type === '0') {
      setTypeErr('Please choose your role');
      setTimeout(() => {
        setTypeErr(null);
      }, 3000);
      return;
    }
    if (password.length < 5) {
      setPasswordErr("Atleast five characteres!");
      setTimeout(() => {
        setPasswordErr(null);
      }, 3000);
      return;
    }
    if (phone.length < 10) {
      setPhoneErr("Invalid phone number!");
      setTimeout(() => {
        setPhoneErr(null);
      }, 3000);
      return;
    }
    if (phone.length > 10) {
      setPhoneErr("Invalid phone number!");
      setTimeout(() => {
        setPhoneErr(null);
      }, 3000);
      return;
    }

    const user = {
      name,
      email,
      password,
      phone,
      branch,
      type,
      domain,
    };
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/coor/sign-up`, user)
      .then((result) => {
        const res = result;
        setIsLoading(false);
        if (res.status === 200) {
          navigate("/sign-in");
        } else if (res.status === 208 || res.status === 400) {
          setErrorsMade(res.data.message);
          setTimeout(() => {
            setErrorsMade(null);
          }, 3000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorsMade(err.response.data.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.signup__content}>
        {/* <div>
          <img src="techFEST'23.webp" alt="techFest'23" className={styles.signup__logo} />
        </div> */}

        <form method="post" className={styles.signup__inputFields} action="">
          {divTwo && (
            <div className={styles.signup__page2}>
              <h1 className={styles.signup__title}>Hi {stringArray[0]}!</h1>
              {errorsMade && <p style={{ color: "red" }}>{errorsMade}</p>}
              {{ fieldErr } && <p style={{ color: "red" }}>{fieldErr}</p>}
              <label htmlFor={phone} className={styles.signup__label}>
                Phone
                {phoneErr && (
                  <p style={{ color: "red", fontSize: "1rem" }}>{phoneErr}</p>
                )}
              </label>
              <input
                type="number"
                id={phone}
                name="phone"
                placeholder="Enter your whatsapp number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="off"
              />
              {branchErr && <p style={{ color: "red" }}>{branchErr}</p>}
              <select
                className={styles.signup__select}
                sx={{ height: "10px" }}
                onChange={(e) => setBranch(e.target.value)}
                id="branch"
                name="branch"
                value={branch}
                required
              >
                <option value="0">Branch Enrolled</option>
                <option value="Aeronautical Engineering">
                  Aeronautical Engineering
                </option>
                <option value="Aerospace Engineering">
                  Aerospace Engineering
                </option>
                <option value="Automobile Engineering">
                  Automobile Engineering
                </option>
                <option value="Biomedical Engineering">
                  Biomedical Engineering
                </option>
                <option value="Biotechnology Engineering">
                  Biotechnology Engineering
                </option>
                <option value="Ceramic Engineering">Ceramic Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Communications Engineering">
                  Communications Engineering
                </option>
                <option value="Computer Science Engineering">
                  Computer Science Engineering
                </option>
                <option value="Construction Engineering">
                  Construction Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Electronics & Communication Engineering">
                  Electronics & Communication Engineering
                </option>
                <option value="Electronics Engineering">
                  Electronics Engineering
                </option>
                <option value="Environmental Engineering">
                  Environmental Engineering
                </option>
                <option value="Food Engineering and Technology">
                  Food Engineering and Technology
                </option>
                <option value="Instrumentation and Control Engineering">
                Instrumentation and Control Engineering
                </option>
                <option value="Industrial Engineering">
                  Industrial Engineering
                </option>
                <option value="Marine Engineering">Marine Engineering</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Mechatronics Engineering">
                  Mechatronics Engineering
                </option>
                <option value="Metallurgical Engineering">
                  Metallurgical Engineering
                </option>
                <option value="Mining Engineering">Mining Engineering</option>
                <option value="Petroleum Engineering">
                  Petroleum Engineering
                </option>
                <option value="Power Engineering">Power Engineering</option>
                <option value="Production Engineering">
                  Production Engineering
                </option>
                <option value="Robotics Engineering">
                  Robotics Engineering
                </option>
                <option value="Structural Engineering">
                  Structural Engineering
                </option>
                <option value="Telecommunication Engineering">
                  Telecommunication Engineering
                </option>
                <option value="Textile Engineering">Textile Engineering</option>
                <option value="Tool Engineering">Tool Engineering</option>
                <option value="Transportation Engineering">
                  Transportation Engineering
                </option>
              </select>
              {typeErr && <p style={{ color: 'red' }}>{typeErr}</p>}
              <select
                className={styles.signup__select}
                sx={{ height: "10px" }}
                onChange={(e) => {
                  setType(e.target.value);
                  showHide(e);
                }}
                id="type"
                name="type"
                value={type}
                required
              >
                <option value="0">Coordinator Type</option>
                <option value="Domain">Domain</option>
                <option value="Event">Event</option>
                <option value="Faculty">Faculty</option>
              </select>
              {toggle === 'Domain' && (
                <select
                  className={styles.signup__select}
                  sx={{ height: "10px" }}
                  onChange={(e) => {
                    setDomain(e.target.value);
                  }}
                  id="domain"
                  name="domain"
                  value={domain}
                  required
                >
                  <option value="">Choose Domain</option>
                  <option value="Aarambh">Aarambh</option>
                  <option value="Chemfor">Chemfor</option>
                  <option value="Electrica">Electrica</option>
                  <option value="Genesis">Genesis</option>
                  <option value="Karyarachna">Karyarachna</option>
                  <option value="Kermis">Kermis</option>
                  <option value="Mechanica">Mechanica</option>
                  <option value="Plexus">Plexus</option>
                  <option value="Robozar">Robozar</option>
                </select>
              )}

              <button
                className={styles.signup__button}
                value="signUp"
                type="button"
                onClick={PostData}
                disabled={isLoading}
              >
                Sign Up
              </button>
              <p className={styles.signup__text}>
                Alter previous data?
                <span className={styles.signin__link} onClick={showDivOne}>
                  Back
                </span>
              </p>
            </div>
          )}

          {divOne && (
            <div className={styles.signup__page1}>
              <h1 className={styles.signup__title}>Welcome!</h1>
              {{ fieldErr } && <p style={{ color: "red" }}>{fieldErr}</p>}
              <label htmlFor="name" className={styles.signup__label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
              />
              <label htmlFor="email" className={styles.signup__label}>
                E-mail
              </label>
              {mailErr && <p style={{ color: "red" }}>{mailErr}</p>}
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
              <label htmlFor="password" className={styles.signup__label}>
                Password
              </label>
              {{ passwordErr } && <p style={{ color: "red" }}>{passwordErr}</p>}
              <input
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                autoComplete="off"
              />
              <label htmlFor="cpassword" className={styles.signup__label}>
                Confirm Password
              </label>
              {{ confirmErr } && <p style={{ color: "red" }}>{confirmErr}</p>}
              <input
                value={cPassword}
                placeholder="Confirm your password"
                variant="standard"
                onChange={(e) => handleConfirm(e.target.value)}
                type="password"
                autoComplete="off"
              />
              <button
                className={styles.signup__button}
                value="next"
                type="button"
                onClick={showDivTwo}
                disabled={isLoading}
                autoComplete="off"
              >
                Next
              </button>
              <p className={styles.signup__text}>
                Already have an account?{" "}
                <Link to={"/"}>
                  <span className={styles.signin__link}>Sign In</span>
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Signup;
