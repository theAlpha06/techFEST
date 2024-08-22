import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { SiShopware } from "react-icons/si";
// import { MdOutlineCancel } from "react-icons/md";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
// import { Domains, Events, Sponsers, Workshops } from "../pages";
import "./Sidebar.css";
// import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { coordinatorLoggedIn, logOutHandler, role, domain } =
    useStateContext();
  const [dom, setDom] = useState(domain);
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <>
      {showSideBar && (
        <div
          className="containerSidebar"
          style={
            coordinatorLoggedIn && role == 892348 ? {} : { height: "600px" }
          }
        >
          <div className="sidebarItems">
            <div className="logo">
              <Link to="/">
                <img src="/techfestlogo.png" alt="techFEST'23" />
              </Link>
            </div>

            {coordinatorLoggedIn && role == 892348 && (
              <div className="item">
                <Link to="/home">Admin</Link>
              </div>
            )}
            {coordinatorLoggedIn && role == 892348 && (
              <div className="item">
                <Link to="/users">Users</Link>
              </div>
            )}
            {coordinatorLoggedIn && (
              <div className="item">
                <Link to="/domains">Domains</Link>
              </div>
            )}

            {coordinatorLoggedIn && role == 948759 && (
              <div className="item">
                <Link to={`/events/domain/${domain}`}>Events</Link>
              </div>
            )}
            {coordinatorLoggedIn && (role == 892348 || role == 3924875) && (
              <div className="item">
                <Link to="/events">Events</Link>
              </div>
            )}
            {coordinatorLoggedIn && (
              <div className="item">
                <Link to="/workshops">Workshops</Link>
              </div>
            )}
            {coordinatorLoggedIn && role == 892348 && (
              <div className="item">
                <Link to="/sponsers">Sponsers</Link>
              </div>
            )}
            {coordinatorLoggedIn && (
              <div className="item">
                <Link to="/">Profile</Link>
              </div>
            )}
            {coordinatorLoggedIn && role == 892348 && (
              <div className="item">
                <Link to="/payment">Payment</Link>
              </div>
            )}
            {coordinatorLoggedIn ? (
              <div
                className="item logOut"
                onClick={() => {
                  logOutHandler();
                  window.location.reload(false);
                  setShowSideBar(false);
                }}
              >
                <Link to="/sign-in">Log Out</Link>
              </div>
            ) : (
              <div
                className="item logOut"
                onClick={() => {
                  // setShowSideBar(false);
                }}
              >
                <Link to="/sign-in">Log In</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
