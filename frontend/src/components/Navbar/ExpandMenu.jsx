import React, { useState } from "react";
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const ExpandMenu = ({toggleDrawer}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/domains")
  }

  return (
    <SMenu>
      <MenuButton onClick={function() {navigateHandler();toggleMenu()}}>
        Domains {isMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
      </MenuButton>
      <SubRoutesContainer isOpen={isMenuOpen}>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/aarambh" 
          key="Arambh">
            Aarambh
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/plexus" 
          key="plexus">
            Plexus
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/Chemfor" 
          key="chemfor">
            Chemfor
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/electrica" 
          key="electrica">
           Electrica
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/genesis" 
          key="genesis">
           Genesis
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/mechanica" 
          key="mechanica">
           Mechanica
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/kermis" 
          key="kermis">
           Kermis
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/robozar" 
          key="robozar">
           Robozar
          </SubRoute>
          <SubRoute 
          onClick={function() {toggleDrawer();toggleMenu()}}
          to= "/events/karyarachna" 
          key="karyarachna">
           Karyarachna
          </SubRoute>
      </SubRoutesContainer>
    </SMenu>
  );
};

export default ExpandMenu;
const SubRoutesContainer = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 0.3rem;
  overflow: scroll;
`;
const SMenu = styled.div``;

const MenuButton = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    transition: 0.3s ease-in;
    color: black;
    background-color: #68fe04;
    border-radius: 5px;
  }
`;

const SubRoute = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  font-size: 1.2rem; 
   &:hover {
    transition: 0.3s ease-in;
    color: black;
    background-color: #68fe04;
    border-radius: 5px;
  }
  
`;