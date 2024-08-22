import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "./components";
import { Domains, Events, Sponsers, Workshops } from "./pages";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Domainadd from "./pages/Domainadd";
import Eventadd from "./pages/Eventadd";
import Eventedit from "./pages/Eventedit.jsx";
import Workshopadd from "./pages/Workshopadd";
import Workshop from "./pages/Workshop";
import Aarambh from "./pages/aarambhAdd.jsx";
import Eventusers from "./pages/Eventusers";
import Sponseradd from "./pages/Sponseradd";
import Profile from "./pages/Profile";
import Signup from "./components/Signup/Signup.jsx";
import Signin from "./components/Signin/Signin.jsx";
import Payment from "./pages/payment.jsx";
//import Profile from './components/UserProfile.jsx'
import "./App.css";
import Eventdomain from "./pages/Eventdomain";

import { useStateContext } from "./contexts/ContextProvider";
//import Profile from './pages/Profile';
//import ProfileUpdate from './pages/ProfileUpdate';

const App = () => {
  const { activeMenu, coordinatorLoggedIn, role } = useStateContext();
  return (
    <div style={{ marginBottom: "0px" }}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg mb-0">
          {activeMenu ? (
            <div
              className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white  mb-0"
              style={{
                zIndex: "10",
                height: "100vh",
                color: "black",
              }}
            >
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg mb-0">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 mb-0 "
            }
          >
            <div
              className="fixed   md:static bg-main-bg dark:bg-main-dark-bg navbar w-full mb-0"
              style={{ background: "white" }}
            >
              <Navbar />
            </div>
            <div style={{ marginBottom: "0px" }}>
              <Routes>
                {/* dashboard  */}

                {!coordinatorLoggedIn && (
                  <Route path="/sign-in" element={<Signin />} />
                )}
                {coordinatorLoggedIn  && <Route path="/" element={<Home />} />}
                {!coordinatorLoggedIn && (
                  <Route path="/sign-up" element={<Signup />} />
                )}
                {coordinatorLoggedIn && (
                  <Route path="/workshop/:id" element={<Workshop />} />
                )}
                {coordinatorLoggedIn && (
                  <Route path="/event/:id" element={<Eventusers />} />
                )}
                {coordinatorLoggedIn &&
                  (role === 948759 || role === 892348) && (
                    <Route path="/addaarambh" element={<Aarambh />} />
                  )}
                {coordinatorLoggedIn && (
                  <Route path="/" element={<Profile />} />
                )}
                {/* pages  */}
                {coordinatorLoggedIn && (
                  <Route path="/domains" element={<Domains />} />
                )}
                {coordinatorLoggedIn && (
                  <Route path="/events" element={<Events />} />
                )}
                {coordinatorLoggedIn && role === 892348 && (
                  <Route path="/sponsers" element={<Sponsers />} />
                )}
                {coordinatorLoggedIn && (
                  <Route path="/workshops" element={<Workshops />} />
                )}
                {coordinatorLoggedIn && role === 892348 && (
                  <Route path="/domainadd" element={<Domainadd />} />
                )}
                {coordinatorLoggedIn && role === 948759 && (
                  <Route path="/eventadd" element={<Eventadd />} />
                )}
                {coordinatorLoggedIn && role === 948759 && (
                  <Route path="/eventedit/:id" element={<Eventedit />} />
                )}
                {coordinatorLoggedIn && role === 892348 && (
                  <Route path="/workshopadd" element={<Workshopadd />} />
                )}
                {coordinatorLoggedIn && role === 892348 && (
                  <Route path="/sponseradd" element={<Sponseradd />} />
                )}
                {coordinatorLoggedIn && role === 892348 && (
                  <Route path="/users" element={<Users />} />
                )}
                {coordinatorLoggedIn && (role === 948759 || role === 3924875) && (
                  <Route
                    path="/events/domain/:domain"
                    element={<Eventdomain />}
                  />
                )}
                {coordinatorLoggedIn && role === 892348 && (
                  <Route path="/payment" element={<Payment />} />
                )}
              </Routes>
            </div>
          </div>
        </div>
        {coordinatorLoggedIn && <Footer />}
      </BrowserRouter>
    </div>
  );
};

export default App;
