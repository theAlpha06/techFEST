import { useState, useContext } from "react";
import styles from "./Signin.module.css";
import axios from "axios";
import logo from "../../images/techFEST '23.webp";
import { baseUrl } from "../../API/api";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import Loader from '../Loader/Loader.js';
import { AiOutlineLeft } from "react-icons/ai";

const Signin = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMade, setErrorsMade] = useState();
  const [fieldErr, setFieldErr] = useState(null);
  const [mailErr, setMailErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const navigate = useNavigate();

  const userLoginHandle = async (authData) => {
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/auth/sign-in`, authData)
      .then((result) => {
        setIsLoading(false)
        const res = result;
        if (res.status === 204) {
          setTimeout(() => {
            setMailErr(null);
            navigate("/sign-up");
          }, 3000);
        } else if (res.status === 208) {
          setPasswordErr(res.data.message);
          setTimeout(() => {
            setPasswordErr(null);
            if(res.data.message.includes('email')){
;              navigate('/sign-up');
            }
          }, 3000);
          return;
        } else if (res.status === 206) {
          setPasswordErr(res.data.message);
          setTimeout(() => {
            setPasswordErr(null);
            navigate('/verify')
          }, 3000);
          return;
        }
        if (res.status === 200) {
          const userData = {
            token: res.data.token,
            userId: res.data.userId,
            userRole: res.data.userRole,
          };
          authContext.login(userData);
          navigate('/user-dashboard');
        } else {
          setErrorsMade(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        return;
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
    const user = {
      email: email,
      password: password,
    };
    setIsLoading(true);
    userLoginHandle(user);
  };

  const clickNavigateHandler = () => {
    navigate("/");
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.signin__content}>
        <div className={styles.signin_linkToHome}>
        <AiOutlineLeft style={{fontSize: "1.8rem",paddingTop:"15px"}}/>
          <button className={styles.signin_btnToHome} onClick= {clickNavigateHandler}>
              back to home 
          </button>
        </div>
        
        <div>
          <img src={logo} alt="techFest'23" className={styles.signin__logo} />
        </div>
        <div className={styles.login}>
        <div>
        <h1 className={styles.signin__title}>Welcome Back!</h1>
            <p className={styles.signin__text} style={{marginLeft: "10px"}}>Sign in to continue</p>
        </div>
        <div className={styles.signin__page}>
          {errorsMade && <p style={{ color: "red" }}>{errorsMade}</p>}          
          <form
            method="post"
            onSubmit="return myFormValidation()"
            className={styles.signin__inputFields}
            action=""
          >
            
            {fieldErr && <p style={{ color: "red" }}>{fieldErr}</p>}
            {password && <p style={{ color: "red" }}>{passwordErr}</p>}
            <label htmlFor="email" className={styles.signin__label}>
              {mailErr && <p style={{ color: "red" }}>{mailErr}</p>}
              EMAIL*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='off'
            />
            <label htmlFor="password" className={styles.signin__label}>
              PASSWORD*
            </label>
            <input
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete='off'
            />
            <div className={styles.signin__div}>
            <Link to="/forgot-password">Forgot Password?</Link>
              <button
                className={styles.signin__button}
                value="signIn"
                type="button"
                onClick={PostData}
                disabled={isLoading}
              >
                Sign In
              </button>
              
            </div>
            {/* </div> */}
          </form>
          <p className={styles.signin__text}>
            Don't have an account?
            <Link to={"/sign-up"}>
              <span className={styles.signin__link}>Sign Up</span>
            </Link>
          </p>
        </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
