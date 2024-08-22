import React, {useContext,useState} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import ExpandMenu from "./ExpandMenu";
import logo from "./logo.png";
const Drawer = ({ isOpen, toggleDrawer }) => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logOutHandler = async () => {
    authContext.logout();
    navigate("/");
  };
  const navigateHomeHandler = () => {
    navigate("/")
  }

  return (
    <>
      {isOpen && <Backdrop onClick = {function() {toggleDrawer();toggleMenu()}}/>}
      <SDrawer isOpen={isOpen}>
      
        <RightNav>
        <Image src={logo} alt="" onClick = {function() {toggleDrawer();navigateHomeHandler()}}/>
          <NavRoutes>
                {/* <NavRoute
                  onClick={toggleDrawer}
                  to="/"
                  key="Home"
                >
                  Home
                </NavRoute> */}
                {authContext.isUserLoggedIn && (
                <NavRoute
                  onClick={toggleDrawer}
                  to="/user-dashboard"
                  key="dashboard"
                >
                  Dashboard
                </NavRoute>
                )}
                <NavRoute
                  onClick={toggleDrawer}
                  to="/workshops"
                  key="Workshops"
                >
                  Workshops
                </NavRoute>
                <NavRoute
                  onClick={toggleDrawer}
                  to="/about"
                  key="About Us"
                >
                  About Us
                </NavRoute>
                <NavRoute
                  onClick={toggleDrawer}
                  to="/faq"
                  key="faq"
                >
                  FAQ
                </NavRoute>
                <NavRoute
                  onClick={toggleDrawer}
                  to="/our-team"
                  key="our-team"
                >
                  Our Team
                </NavRoute>

                <ExpandMenu toggleDrawer={toggleDrawer}/>
                
                {!authContext.isUserLoggedIn && (
                <NavRoute
                  onClick={toggleDrawer}
                  to="/sign-in"
                  key="sign-in"
                >
                  Login
                </NavRoute>
                )}
                {authContext.isUserLoggedIn && (
                <NavRoute
                  onClick={logOutHandler}
                  to="/sign-up"
                  key="sign-up"
                >
                  Logout
                </NavRoute>
                )}
                
          </NavRoutes>          
        </RightNav>
      </SDrawer>
    </>
  );
};

export default Drawer;
// const SNavbarBrand = styled.h2`
//   font-size: 1.5rem;
// `;
const Image = styled.img`
    padding: 1rem;
    width:80%;
    cursor: pointer;
    @media (max-width: 600px) {
      width: 90%;
    }
`;
const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s ease;
  background-color: rgba(0, 0, 0, 0.2);
`;
const SDrawer = styled.div`
  z-index: 150;
  position: absolute;
  top: 0;
  color: white;
  height:100%;
  width: 21%;
  overflow:hidden;
  background-color: black;
  transition: 0.3s ease;

  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  @media (max-width: 1200px){
    width:35%;
  }
  @media (max-width: 600px){
    width:60%;
  }
`;

const RightNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
  
  font-size: 1rem;
  padding: 1rem;
`;
const NavRoutes = styled.div`
color: white;
font-size: 1rem;
padding: 0.5rem;

`;
const NavRoute = styled(Link)`
  display: flex;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;

  &:hover {
    transition: 0.3s ease-in;
    color: black;
    background-color: #68fe04;
    border-radius: 5px;
  }
`;

// const LoginButton = styled.button`
//   padding: 0.7rem 3rem;
//   background-color: white;
//   border: 1px solid black;
//   border-radius: 1rem;
//   transition: 0.3s ease;
//   align-self: flex-start;
//   &:hover {
//     transition: 0.3s ease;
//     border: 1px solid transparent;
//     background-color: gray;
//      color:white;
//     box-shadow: 0px 0px 10px gray;
//   }
// `;
// const LoginButton = styled.button`
//   padding: 0.6rem 2.5rem;
//   margin-left: 0.6rem;
//   font-size: 18px;
//   background-color: #68fe04;
//   border: 1px solid black;
//   border-radius: 0.5rem;
//   transition: 0.3s ease;
//   align-self: flex-start;
  
//   &:hover {
//     transition: 0.3s ease;
//     color: #011E05;
//     border: 1px solid transparent;
//     box-shadow: 0px 0px 10px black;
//   }
// `;