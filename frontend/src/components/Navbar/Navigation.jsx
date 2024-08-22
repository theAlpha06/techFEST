
import React, { useState } from "react";
import Navbar1 from "./Navbar1";
// import styled from "styled-components";
import Drawer from "./Drawer";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Navbar1 toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Navigation;

