import "./underConstruction.css";
// import logo from "../../images/Asset 8@3x 1.png";
import { Link } from "react-router-dom";

const forgotPassword = () => {
  return (
    <div className="underConstruction">
      {/* <div>
        <img
          src={logo}
          alt="techFestSLIET'23 logo"
          className="underConstruction__bg"
        />
      </div> */}
      <div className="underConstruction__content">
        {/* <p className="underConstruction__text">Sorry this page is</p> */}
        <h1 className="underConstruction__title">COMING SOON !</h1>
        <p className="underConstruction__para">Please come back later</p>

        <Link to="/" className="underConstruction__btn">
          Home
        </Link>
      </div>
    </div>
  );
};

export default forgotPassword;
