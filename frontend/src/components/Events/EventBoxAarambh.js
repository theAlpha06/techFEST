import React,{useState} from 'react';
import './EventBox.css';
import { FaRegCalendar, FaRegClock, FaUnity } from "react-icons/fa";
import ErrorModel from '../ErrorPopup/ErrorModel';
import { Schedule } from '@mui/icons-material';


function EventBox({ props, index }) {
const[errorMade,setErrorMade] = useState();
const onErrorMadeHandle = () => {
setErrorMade(null);
}
    const coor_len = (props?.coor).length;
    const onErrorHappen = () => {
        setErrorMade({title:"Register Now",message:"Coming Soon"})
    }
    const onErrorHappen1 = () => {
        setErrorMade({title:"Problem Statement",message:"Coming Soon"})
    } 

    return (
        <>
        {errorMade && 
  <ErrorModel 
  title={errorMade.title}
  message={errorMade.message}
  onErrorClick={onErrorMadeHandle}
  />
  }
            {
                (coor_len === 1) ? (
                    <div className='eventBoxSingle' key={index}>
                        <div className='LeftOfEventBox'>
                            <div className='evntDesc' style={{ float: "left" }}>

                                <h1 style={{ textAlign: "left" }}>{props?.nameOfEvent}</h1>
                                <p className='eventDesc'>{props?.desc}</p>
                                <div style={{ float: "left" }}>
                                    <button className='registerNowEvent'> {props?.register} </button>
                                    <button className='problemStat' > {props?.schedule} </button>
                                </div>
                                <div style={{ float: "left" }}>
                                    <h2 style={{ marginTop: "6px", textAlign: "left" }}>Prizes Worth <br></br> {props?.prizeMoney} </h2>
                                    <p style={{fontSize: "14px", margin:"0.5rem 0"}}>
                                    <FaUnity />Event Mode : {props?.eventMode} </p>
                                    <p style={{ fontSize: "14px", textAlign: "left" }}>
                                        <FaRegCalendar /> Register Before {props?.dateBefore}<br></br>
                                        <FaRegClock /> 11:59 P.M.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='RightOfEventBox'>
                            <div className='objOfEventBox'>

                                {
                                    (coor_len === 1) ? (props?.coor)?.map((cor) => {
                                        return <div className='boxImage'>
                                            <img src={cor.img} className='boxImgSingle' alt='.' />
                                            <div className='event__coordinator'> <span> {cor.nameOfEventCoordinator} </span><br></br> <span> {cor.phoneNo} </span><br></br> <span> {cor.mail} </span></div>
                                        </div>
                                    }
                                    ) :
                                        (props?.coor)?.map((cor) => {
                                            return <div className='boxImage'>
                                                <img src={cor.img} className='boxImgDouble' alt='.' />
                                                <div className='event__coordinator'> <span> {cor.nameOfEventCoordinator} </span><br></br> <span> {cor.phoneNo} </span><br></br> <span> {cor.mail} </span></div>
                                            </div>
                                        })
                                }

                            </div>
                        </div>

                    </div>
                ) : (
                    <div className='eventBox' key={index}>
                        <div className='LeftOfEventBox'>
                            <div className='evntDesc' style={{ float: "left" }}>

                                <h1 style={{ textAlign: "left" }}>{props?.nameOfEvent}</h1>
                                <p className='eventDesc'>{props?.desc}</p>
                                <div style={{ float: "left" }}>
                                    <button className='registerNowEvent' onClick={onErrorHappen}> Register Now </button>
                                    <button className='problemStat'> {props?.schedule} </button>
                                </div>
                                <div style={{ float: "left" }}>
                                    <h2 style={{ marginTop: "6px", textAlign: "left" }}>Prizes Worth <br></br> {props?.prizeMoney} </h2>
                                    <p style={{fontSize: "14px", margin:"0.5rem 0"}}>
                                    <FaUnity />Event Mode : {props?.eventMode} </p>
                                    <p style={{ fontSize: "14px", textAlign: "left" }}>
                                        <FaRegCalendar /> Register Before {props?.dateBefore}<br></br>
                                        <FaRegClock /> 11:59 P.M.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='RightOfEventBox'>
                            <div className='objOfEventBox'>

                                {
                                    (coor_len === 1) ? (props?.coor)?.map((cor) => {
                                        return <div className='boxImage'>
                                            <img src={cor.img} className='boxImgSingle' alt='.' />
                                            <div style={{ marginLeft: "10px", textAlign: "center", fontSize: "14px" }}> <span> {cor.nameOfEventCoordinator} </span><br></br> <span> {cor.phoneNo} </span><br></br> <span> {cor.mail} </span></div>
                                        </div>
                                    }
                                    ) :
                                        (props?.coor)?.map((cor) => {
                                            return <div className='boxImage'>
                                                <img src={cor.img} className='boxImgDouble' alt='.' />
                                                <div className='event__coordinator' style={{ marginLeft: "10px", fontSize: "14px" }}> <span> {cor.nameOfEventCoordinator} </span><br></br> <span> {cor.phoneNo} </span><br></br> <span> {cor.mail} </span></div>
                                            </div>
                                        })
                                }

                            </div>
                        </div>

                    </div>)
            }


        </>

    )
}

export default EventBox;
