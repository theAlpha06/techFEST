import React from "react";
import LiImage from "../../components/aboutUs/Li_image";
import "./AboutUs.css";
import { gallery } from "../../dummydata/AboutGallery.js";
import SponsorImageSlider from "../../components/slider/SponsorImageSlider.js";
import SliderDiv from "../../components/slider/SliderDiv";
import RiImage from "../../components/aboutUs/Ri_image";
function AboutUs() {
  return (
    <div className="AboutUs"> 
      <div className="AboutUsBg">
        <img src="/about-us/main.webp" width={"100%"} height={"100%"} alt="" />
      </div>
      <div className="container_AboutUs_Upperpart">
        <div className="About_Us_part1">
          <div className="About_Uspart1techfest_logo">
            <img src="/tf23.webp" alt="" />
          </div>
          <div className="About_Uspart1SLIET_logo">
            <img src="/about-us/white-sliet-1@2x.png" alt="" />
          </div>
        </div>
        <div className="About_Us_part2">
          {/* <LazyLoadImage src={props.data.head_tf[0].imageSrc} alt="" /> */}
          <div className="About_Uspart2_text  ">
            <p>
              techFEST is a platform where engineers, innovators, changemakers,
              entrepreneurs and tech enthusiasts collaborate to create solutions
              to some of the world's most challenging problems.
            </p>
          </div>
        </div>
      </div>
      <div
        className="AboutDivider"
        style={{ marginTop: "10px", height: "30px" }}
      >
        <img src="/about-us/stats-sec.svg" alt="" height={"1%"} />
      </div>
      {/* ** */}

      <div className="About">
        <div className="AboutSliet">
          <div className="aboutSlietBg">
            <img
              src="/about-us/whatsapp-image-20230111-at-1526-1@2x.png"
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </div>
          <div className="AboutSlietHeading">
            <h1>
              About{" "}
              <span
                style={{ color: "#74eb76", fontFamily: "monumentExtended" }}
              >
                SLIET
              </span>
            </h1>
          </div>
          <div className="AboutSlietHeadingBottom"></div>
          <div className="AboutSlietText">
            <p>
              Sant Longowal Institute of Engineering and Technology was
              established as a tribute to the revered saint Sant Harchand Singh
              Longowal. <br /> <br /> The institute strives to impart quality
              knowledge and technical skills by creating a healthy competitive
              environment that encourages innovation and critical thinking among
              students. At the academic level the institute offers various
              Undergraduate and PostGraduate programmes. Apart from academics,
              SLIET is home to various co-curricular activities and communities
              such as National Cadet Corps - SLIET, Endeavour, Mavericks, SSDC,
              Juggernauts, Green rangers, Institute Innovation cell, SRAS,
              National Service Scheme, etc.
            </p>
          </div>
        </div>

        <div className="AboutInfo">
          <div className="Participants">
            <img src="/about-us/Group 881.svg" height={"50px"} alt="" />
            <h1>35+</h1>
            <h4 style={{ fontFamily: "productSans" }}>
              Institutes Participate every year
            </h4>
            <img
              src="/about-us/stats-sec.svg"
              width={"80%"}
              height={"4px"}
              alt=""
            />
          </div>

          <div className="Participants">
            <img src="/about-us/Group 878.svg" height={"50px"} alt="" />
            <h1>10K+</h1>
            <h4 style={{ fontFamily: "productSans" }}>
              Footfall during techFEST 21
            </h4>
            <img
              src="/about-us/stats-sec.svg"
              width={"80%"}
              height={"4px"}
              alt=""
            />
          </div>

          <div className="Participants last">
            <img src="/about-us/Group 879.svg" height={"50px"} alt="" />
            <h1>5L+</h1>
            <h4 style={{ fontFamily: "productSans" }}>
              Worth of Goodies and Prize Money
            </h4>
          </div>
        </div>
      </div>

      {/* media query aboutinfo */}
      <div className="AboutInfo1">
        <div className="Participants1">
          <img src="/about-us/Group 881.svg" height={"50px"} alt="" />
          <h1>30 +</h1>
          <h4 style={{ fontFamily: "productSans" }}>
            Institutes Participate every year
          </h4>
        </div>

        <div className="Participants1">
          <img src="/about-us/Group 878.svg" height={"50px"} alt="" />
          <h1>10K +</h1>
          <h4 style={{ fontFamily: "productSans" }}>
            Footfall during techFEST 21
          </h4>
        </div>

        <div className="Participants1 last1">
          <img src="/about-us/Group 879.svg" height={"50px"} alt="" />
          <h1>5L +</h1>
          <h4 style={{ fontFamily: "productSans" }}>
            Worth of Goodies and Prize Money
          </h4>
        </div>
      </div>

      {/* various techfests */}
      <div className="VariousTechfest">
        {/* //eslint-disable-next-line */}

        <LiImage
          img={"/about-us/Group 767.webp"}
          heading={"techFEST’23"}
          tagline={"Innovation in Agriculture"}
          detail={
            "With 40+ Events and an aim to take up the Ultimate Leap in Technology for Agriculture, this year."
          }
        />

        {/* //eslint-disable-next-line */}
        <RiImage
          img={"/about-us/Group 767.png"}
          heading={"techFEST’22"}
          tagline={"The Ultimate Leap to Agri-Tech"}
          detail={
            "With 40+ Events and an aim to take up the Ultimate Leap in Technology for Agriculture, this year."
          }
        />

        {/* //eslint-disable-next-line */}

        <LiImage
          img={"/about-us/Group 768.png"}
          heading={"techFEST’21"}
          tagline={"Revitalizing India"}
          detail={
            "With 30+ Universities Across the Nation we ensured that together we come up with technologies Revitalising India."
          }
        />
        {/* //eslint-disable-next-line */}
        <RiImage
          img={"/about-us/Group 769.png"}
          heading={"techFEST’20"}
          tagline={"Pedalling towards Cosmic Yantra"}
          detail={
            "It instigated the innovation in space and we expanded our wings to more 30 universities all over the country."
          }
        />

        {/* //eslint-disable-next-line */}
        <LiImage
          img={"/about-us/Group 770.png"}
          heading={"techFEST’19"}
          tagline={"Innovation in Cycle Design"}
          detail={
            "Engrossed the Innovation in Bicycle with  collaborations of universities nationwide."
          }
        />
      </div>

      {/* gallery */}
      <div className="sponsor">
        <h1 id="sponsor" style={{ color: "#74EB76", marginBottom: "3rem" }}>
          GALLERY
        </h1>
        <SliderDiv arr={gallery} />
      </div>

      {/* previos sponsr */}
      <div className="sponsor" style={{ width: "100%" }}>
        <h1 id="sponsor" style={{ color: "#74EB76", marginBottom: "3rem" }}>
          OUR
          <span style={{ color: "white", fontFamily: "monumentExtended" }}>
            {" "}
            PAST
          </span>{" "}
          PARTNERS
        </h1>
        <SliderDiv arr={SponsorImageSlider} />
      </div>
    </div>
  );
}

export default AboutUs;
