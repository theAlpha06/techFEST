import React, { useState, useEffect } from 'react'
import "./Footer.css"
import Button from "@mui/material/Button";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setIsScrollingDown(currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (

    <footer>
      <div className={`footer-items ${isScrollingDown ? "visible" : "hidden"}`}>
        <div>
          <a target="_blank" href='https://www.facebook.com/techfestsliet/'>
            <Button variant="rounded"><FacebookIcon style={{ color: "white" }} /></Button>
          </a>
          <a target="_blank" href='https://www.instagram.com/techfestsliet_/'>
            <Button variant="rounded"><InstagramIcon style={{ color: "white" }} /></Button>
          </a>

          <a target="_blank" href='https://www.linkedin.com/company/techfest-sliet/'>
            <Button variant="rounded"><LinkedInIcon style={{ color: "white" }} /></Button>
          </a>
          <a target="_blank" href='https://www.youtube.com/@techfestslietofficial'>
            <Button variant="rounded"><YouTubeIcon style={{ color: "white" }} /></Button>
          </a>
        </div>
        <div>
          <span className='copyRightSym'>&copy; 2023 All rights reserved by techFEST SLIET</span>
        </div>

      </div>
    </footer>

  )
}

export default Footer