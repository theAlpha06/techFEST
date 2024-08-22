import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomeScreen.css";
import { useNavigate } from "react-router-dom";
import SponsorImageSlider from "../../components/slider/SponsorImageSlider.js";
import SliderDiv from "../../components/slider/SliderDiv";
import AuthContext from "../../auth/authContext";
import SubthemeBox from "./SubthemeBox";
import hexagonImg from "./hexagon.png";

const HomePage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  return (
    <div className="homePage">
      <div className="FirstPage">
        <div className="landingPageCover">
          <img
            src="/main_page.gif"
            alt="gif"
            className="landingPageCover__animation"
          />
        </div>
        <div className="landingPage">
          <div className="logoContainer">
            <img src="/tf23.webp" alt="" className="main_img" />
          </div>
          <div className="innovationIn">
            <div className="innovation">
              <h1 id="inn">INN</h1>
              <div className="O"></div>
              <h1 id="vation">VATION</h1>
            </div>
            <h1 id="in">in</h1>
          </div>
          <h2 id="agriculture">AGRICULTURE</h2>
          <p className="landingText">
            techFEST'23 is on the mission to revolutionize Agro-Technology.
            Explore with us how new advancements in technologies ranging from
            robotics and drones to computer vision software transform
            traditional methods of agriculture. With the young innovative minds
            competing to bring a change and supporting the backbone of our
            nation.
          </p>
          <div
            className="landingButtons"
            style={{ marginTop: 10, color: "white", marginBottom: 1 }}
          >
            {!authContext.isUserLoggedIn &&
            <Button variant="contained" id="signUpButton" sx={{ mr: 2, mt: 3 }}>

              <Link
                to="/sign-up">
                  Sign up
              </Link>
            </Button>
}
          </div>
          <div className="subthemeCont">
            <h1
              style={{
                color: " rgb(22, 188, 22)",
                fontFamily: "monumentExtended",
              }}
            >
              Sub-Theme
            </h1>
            <div className="subthemeBox">
              <img src={hexagonImg} className="hexagonImgBottom1" alt=".." />
              <SubthemeBox index={0} />
              <img src={hexagonImg} className="hexagonImg" alt=".." />
              <SubthemeBox index={1} />
              <img src={hexagonImg} className="hexagonImgBottom" alt=".." />
              <SubthemeBox index={2} />
              <img src={hexagonImg} className="hexagonImg" alt=".." />
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* expanded landing page */}
      <div className="extendedPage">
        <div className="main_container">
          <div className="containerDomain">
            <img src="domain.svg" height={250} width={250} alt="" />
            <h1 style={{ color: "#fff" }} className="containerHeading">
              Domains
            </h1>
            <p className="containerText" style={{ color: "#fff" }}>
              Unleash your skills and test yourselves on National Battlegrounds
              with 8 Domains
            </p>
            <Button
              sx={{ color: "#fff", mt: 3, borderRadius: 6, width: 150, mb: 5 }}
              className="learnMoreButton"
              onClick={() => navigate("/domains")}
            >
              Learn More
            </Button>
          </div>
          <div className="containerWorkshops">
            <img src="/workshop.webp" height={250} width={250} alt="" />
            <h1 style={{ color: "#fff" }} className="containerHeading">
              Workshops
            </h1>
            <p className="containerText" style={{ color: "#fff" }}>
              In Workshops learning is something to be enjoyed, not endured.
            </p>
            <Button
              sx={{ color: "#fff", mt: 3, borderRadius: 6, width: 150, mb: 5 }}
              className="learnMoreButton"
              onClick={() => navigate("/workshops")}
            >
              Learn More
            </Button>
          </div>
        </div>
        {/* trailer*/}
        <div style={{ marginTop: 14 }} className="trailer">
          <h1 id="trailer">TRAILER</h1>
          <div className="trailerBox" style={{ marginTop: 4 }}>
            <iframe
              className="trailerVid"
              src="https://www.youtube.com/embed/XDHiAhdgGcU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        {/* sponsor */}
        <div className="sponsor" style={{ marginTop: 14 }}>
          <h1 id="sponsor" style={{ color: "#74EB76", marginBottom: "3rem" }}>
            <span style={{ color: "white", fontFamily: "monumentExtended" }}>
              Our
            </span>{" "}
            Past Partners
          </h1>
          <SliderDiv arr={SponsorImageSlider} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
