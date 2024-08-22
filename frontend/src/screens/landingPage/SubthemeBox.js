import React from 'react'
import './SubthemeBox.css'
// import hexagonImg from './hexagon.png'

const SubthemeBox = ({ index }) => {
    let un = dataOfBox.filter((item, i, ar) => ar.indexOf(item) === index);
    console.log(un);
    return (
        <>
            <div className='SubThemeBox'>
                <div>
                    {un.map((items) => (
                        <p style={{fontFamily: "productSansBold"}}>
                            {items.desc}
                        </p>
                    ))}
                </div>
            </div>
            {/* <img
                src={hexagonImg} 
                className='hexagonImg'
                alt='..'
            /> */}
        </>
    )
}

export default SubthemeBox

const dataOfBox = [
    {
        desc: "Energy management & Renewable Energy, Control systems - based projects for agriculture sector/industry"
    },
    {
        desc: "Robotics and Automation in the Agriculture and Food industry"
    },
    {
        desc: "Design & Development of projects for smart and sustainable agriculture"
    }
]