import React, { useEffect, useState } from 'react';
import './workshop.css';
import wrkshop from "./Workshop.png";
import WorkshopBox from './workshopbox';
import { baseUrl } from '../API/api';
import axios from 'axios';

const Workshops = () => {

  const [workshops, setWorkshops] = useState(null);

  useEffect( () => {
    getWorkshops();
  }, []);

  const getWorkshops = async() => {
    try {
      const response = await axios.get(`${baseUrl}/workshop/workshops`);
      setWorkshops(response.data.workshops);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <div className='wrkshopsBackgroundTop'>
        <div className='outer_circle'>
          <div className='inner_circle'>
            <img src={wrkshop} className='workshpImg' alt=".." />
          </div>
          <div className='explore_wrkshop'>
            <h2>WORKSHOPS</h2>
            <p style={{ marginTop: "-4px", fontSize: "small", textAlign: "center" }}>Explore Workshops</p>
            <p>
            Welcome to our engineering workshops! Our workshops are designed to provide engineering students and professionals with practical knowledge and skills that they can apply in their work or studies. We offer a wide range of workshops on topics such as software development, electrical engineering, mechanical engineering, civil engineering, and more. Our workshops are led by expert engineers and trainers who guide you through the learning process and provide you with feedback and support. 
            </p>
          </div>
        </div>
      </div>


      {/* Name of the Workshop */}
      {workshops && <div className='wrkshopsBackgroundBottoms'>
        {workshops.map((workshop) => (
          <WorkshopBox index={workshop._id} props={workshop} />
        ))}
      </div>}
    </>
  )
}

export default Workshops;
