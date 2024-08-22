import React from 'react';
import './Loading.css';
import techFestLogo from "./techFEST '23.webp";

const Loading = () => {
    return (
        <>
            <div className='loading_bg'>
                <div className='techFest'>
                    <i>
                        <h1> techFEST <span style={{ color: "rgb(125, 198, 16)" }}>'23 </span></h1>
                        <p>SLIET Longowal's Annual Technical Fest</p>
                    </i>
                </div>

                <div className='loadingContainer'>
                    <img src={techFestLogo} className='techFestLogo' alt=".." />
                    <div className='techFest2'>
                        <i>
                            <h1> techFEST <span style={{ color: "rgb(125, 198, 16)" }}>'23 </span></h1>
                            <p>SLIET Longowal's Annual Technical Fest</p>
                        </i>
                    </div>

                    <h1>COMING THIS <span style={{ color: "rgb(30, 190, 30)" }}>MARCH</span></h1>
                    <p><i>Just getting ready to blow your mind !</i></p>
                </div>
            </div>
        </>
    )
}

export default Loading
