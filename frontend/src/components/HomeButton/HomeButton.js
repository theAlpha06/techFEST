import React from 'react'
import {useNavigate} from 'react-router-dom';
// import logo from '../../images/back.png'
import {AiOutlineHome } from "react-icons/ai";
import styles from './HomeButton.module.css';
  const HomeButton= () => {
    const navigate = useNavigate();
    const goBack = () => {
      
      navigate("/");
    }
  return (
    <div className={styles.backNavigate}>
        <span onClick = {goBack}> <AiOutlineHome style={{width: "40px", height:"18px"}}/> </span>
        <div className={styles.back}>
        <button onClick = {goBack}> Back </button>
        </div>
    </div>
  )
}

export default HomeButton
