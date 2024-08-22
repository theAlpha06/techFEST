import React from 'react';
import './workshop.css';
import { datasOfWorkshop } from "../../dummy data/Workshop";
import WorkshopBox from '../../components/workshop/WorkshopBox';

const Workshop = () => {
  return (
    <>

      {/* <div className='wrkshopsBackgroundTop'>
        <div className='outer_circle'>
          <div className='inner_circle'>
            <img src='/workshop/workshop.png' className='workshpImg' alt=".." />
          </div>
          <div className='explore_wrkshop'>
            <h2>WORKSHOPS</h2>
            <p style={{ marginTop: "-4px", fontSize: "small" }}>Explore Workshops</p>
            <p style={{ marginTop: "10px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
          </div>
        </div>
      </div> */}


      {/* Name of the Workshop */}
      <div className='wrkshopsBackgroundBottoms'>
      {datasOfWorkshop.map((item, index) => (
       <WorkshopBox index={index} props={item}/>
      ))}
      </div>
    </>
  )
}

export default Workshop;
