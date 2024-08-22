// import React from 'react';
// import './events.css';
// import { FaRegCalendar, FaRegClock } from "react-icons/fa";
// import { datasOfEvent } from "./DataOfEvent";
// import TechFestT from "./techFEST23kaT.webp";
// import dummyImg from "../dummy.jpg";

// const events = () => {
//     return (
//         <>
//             <div className='background-of-EventsPage'>
//                 <div className='eventContainer'>
//                     <div className='insideCntiner'>
//                         <div className='techFestTCont'>
//                             <img src={TechFestT} className='techFestT' alt=".." />
//                         </div>
//                         <h1> PLEXUS </h1>
//                         <span className='whiteLine'></span>
//                         <button id='exploreEvents'>Explore Events</button>
//                         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>

//                     </div>
//                 </div>
//             </div>
//             <div className='events'>
//                 <h1 className='evnts'>EVENTS</h1>
//             </div>

//             {/* EVENTS */}
//             {datasOfEvent.map((item, index) => (

//                 <div className='eventsBackgroundBottom' key={index}>

//                     <div className='eventBox'>

//                         <div className='LeftOfBox'>
//                             <h2>{item.nameOfEvent}</h2>
//                             <p>{item.desc}
//                             </p>
//                             <button id='registerNow'> {item.register} </button>
//                             <button id='viewSchedule'> {item.schedule} </button>
//                             <h2 style={{ marginTop: "6px" }}>Prizes Worth <br></br> {item.prizeMoney} </h2>
//                             <p style={{ fontSize: "14px"}}>
//                                 <FaRegCalendar /> Register Before {item.dateBefore}<br></br>
//                                 <FaRegClock /> 11:59 P.M.
//                             </p>
//                         </div>

//                         <div className='RightOfBox'>
//                             <div className='objOfBox'>
//                                 <div ><img src={item.img1} className='boxImg' alt='.' />
//                                     <div style={{ marginRight: "10px", textAlign: "center" }}> <span> {item.nameOfEventCoordinator} </span><br></br> <span> {item.phoneNo} </span></div>
//                                 </div>

//                                 <div><img src={item.img1} className='boxImg' alt='.' />
//                                     <div style={{ marginLeft: "10px", textAlign: "center" }}> <span> {item.nameOfEventCoordinator2} </span><br></br> <span>{item.phoneNo2} </span></div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>

//                 </div>
//             ))}

//             {/* Faculty Advisor */}
//             <div className='bg_bottom'>
//                 <div className='fac_Container'>
//                     <div style={{ textAlign: "center", color: "white" }}>
//                         <img src={dummyImg} className='dummyImg' alt=".." />
//                     </div>
//                     <div style={{ color: "white", textAlign: "center" }}>
//                         <b>Name of Faculty</b><br></br> Faculty Advisor
//                     </div>
//                     <div className='dmnCordintor'>
//                         <div style={{ textAlign: "center", color: "white" }}>
//                             <img src={dummyImg} className='dummyImg2' alt=".." />

//                             <div style={{ textAlign: "center", margin: "7px" }}><b> Domain Coordinator </b><br></br> <a href="tel:1234567890" style={{ textDecoration: "none", color: "white" }}> 1234567890 </a> </div>
//                         </div>

//                         <div style={{ textAlign: "center", color: "white" }}>
//                             <img src={dummyImg} className='dummyImg2' alt=".." />
//                             <div style={{ textAlign: "center", margin: "7px" }}> <b> Domain Coordinator </b> <br></br> <a href="tel:1234567890" style={{ textDecoration: "none", color: "white" }}> 1234567890 </a> </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default events;