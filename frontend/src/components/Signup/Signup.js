import { useState, useCallback } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import logo from "../../images/techFEST '23.webp";
import { baseUrl } from "../../API/api";
import { Link, useNavigate } from "react-router-dom";
import ErrorModel from "../../components/ErrorPopup/ErrorModel";
import Loader from '../../components/Loader/Loader.js';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { AiOutlineLeft,AiFillCaretRight } from "react-icons/ai";
import { textAlign } from "@mui/system";


const Signup = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [dob, setDob] = useState();
  const [branch, setBranch] = useState("0");
  const [confirm_err, setConfirmErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMade, setErrorsMade] = useState(null);
  const [fieldErr, setFieldErr] = useState(null);
  const [branchErr, setBranchErr] = useState(null);
  const [mailErr, setMailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);
  const [divOne, setDivOne] = useState(true);
  const [divTwo, setDivTwo] = useState(false);
  const [errorMade, setErrorMade] = useState();


  const onErrorMadeHandle = () => {
    setErrorMade(null);
  };

  let stringArray = name.split(/(\s+)/);

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
      return;
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
    
    if (!executeRecaptcha) {
      // console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('signUp');
    e.preventDefault();
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      cPassword.trim().length === 0 ||
      phone.trim().length === 0 ||
      collegeName.trim().length === 0
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
      setBranchErr("Please choose your branch");
      setTimeout(() => {
        setBranchErr(null);
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
      setPhoneErr('Invalid phone number!');
      setTimeout(() => {
        setPhoneErr(null);
      }, 3000);
      return;
    }
    if (phone.length > 10) {
      setPhoneErr('Invalid phone number!');
      setTimeout(() => {
        setPhoneErr(null);
      }, 3000);
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
      phone: Number(phone),
      branch: branch,
      collegeName: collegeName,
      dob: dob,
      reCaptchaToken: token
    };
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/auth/sign-up`, user)
      .then((result) => {
        const res = result;
        setIsLoading(false);
        if (res.status === 200) {
          setErrorMade({
            title: "Registered!",
            message: "Kindly check your inbox/spam for verification mail!",
          });
          setTimeout(() => {
            navigate("/sign-in");
          }, 3000);
        } else if (res.status === 400 || res.status === 208) {
          setErrorsMade(res.data.message);
          setTimeout(() => {
            if (res.data.message.includes("email")) {
              navigate("/sign-in");
            }
            setErrorsMade(null);
          }, 3000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data);
        return;
      });
  };

  const clickNavigateHandler = () => {
    navigate("/");
  }

  return (
    <>
      {isLoading && <Loader />}
      {errorMade && (
        <ErrorModel
          title={errorMade.title}
          message={errorMade.message}
          onErrorsClick={onErrorMadeHandle}
        />
      )}

      <div className={styles.signup__content}>
      <div className={styles.signin_linkToHome}>
        <AiOutlineLeft style={{fontSize: "1.8rem",paddingTop:"15px"}}/>
          <button className={styles.signin_btnToHome} onClick= {clickNavigateHandler}>
              back to home 
          </button>
        </div>
        
        <div>
          <img src={logo} alt="techFest'23" className={styles.signup__logo} />
        </div>
        
        <form method="post" className={styles.signup__inputFields} action="">
        <h1 className={styles.signup__title}>Hi {stringArray[0]}!</h1>
          {divTwo && (
            <div className={styles.signup__page2}>
              {errorsMade && <p style={{ color: "red" }}>{errorsMade}</p>}
              
              {{ fieldErr } && <p style={{ color: "red" }}>{fieldErr}</p>}
              <label htmlFor="phone" className={styles.signup__label}>
                Whatsapp Number
              </label>
              {phoneErr && <p style={{ color: "red", fontSize: '1rem' }}>{phoneErr}</p>}
              <input
                type="number"
                id="phone"
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
                sx={{ height: "20px" }}
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
                <option value="Industrial Engineering">
                  Industrial Engineering
                </option>
                <option value="Instrumentation and Control Engineering">
                  Instrumentation and Control Engineering
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
              <label htmlFor="collegeName" className={styles.signup__label}>
                College Name
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                placeholder="Enter your college name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
                autoComplete="off"
              />
              <label htmlFor="dob" className={styles.signup__label}>
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                placeholder="dd-mm-yyyy"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                autoComplete="off"
              />

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
            <div>
            {/* <h1 className={styles.signup__title}>Welcome!</h1> */}
            <div className={styles.signup__page1}>
              
              {{ fieldErr } && <p style={{ color: "red" }}>{fieldErr}</p>}
              <label htmlFor="name" className={styles.signup__label}>
                NAME*
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
                EMAIL*
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
                PASSWORD*
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
                CONFIRM PASSWORD*
              </label>
              {{ confirm_err } && <p style={{ color: "red" }}>{confirm_err}</p>}
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
                <Link to="/sign-in">
                  <span className={styles.signin__link}>Sign In</span>
                </Link> 
              </p>
            </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Signup;
