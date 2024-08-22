import React from 'react';
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import '../../workshop/workshop.css'

function WorkshopBox({props,index}) {
  return (
    <>

    <div className='workshopBox' key={index}>

      <div className='LeftOfBox'>
        <h2>{props?.nameOfWorkshop}</h2>
        <p>{props?.desc}
        </p>
        <button id='registerNow'> {props?.register} </button>
        <button id='viewSchedule'> {props?.schedule} </button>
        {/* <h2 style={{ marginTop: "6px" }}>Prizes Worth <br></br> {props?.prizeMoney} </h2>
        <p style={{ fontSize: "14px" }}>
          <FaRegCalendar /> Register Before {props?.dateBefore}<br></br>
          <FaRegClock /> 11:59 P.M.
        </p>
      </div> */}
{/* 
      <div className='RightOfBox'>
        <div className='objOfBox'>
          <div style={{ marginRight: "10px", textAlign: "center" }}> {props?.nameOfEventCoordinator} <br></br> {props?.phoneNo} </div>
          <div style={{ marginLeft: "10px", textAlign: "center" }}> {props?.nameOfEventCoordinator2} <br></br> {props?.phoneNo2} </div>
        </div> */}
      </div>

    </div>

  </>

  )
}

export default WorkshopBox;