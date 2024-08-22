import React from 'react'
import "./EventBottom.css"

const EventBottom = ({ props }) => {
    const domainCoordinator_len = (props?.domainCoordinator).length;
    return (
        <>
            <div className='bg_bottom'>
                <div className='fac_Container'>
                    <div style={{ textAlign: "center", color: "white" }}>
                        <img src={props.photoOfFaculty} className='dummyImg' alt=".." />
                    </div>
                    <div className='dtlsOfCoor'>
                        <b>{props.nameOfFaculty}</b><br></br> {props.facultyAdvisor} <br />
                    </div>


                    <div className='dmnCordintor'>
                        {
                            (domainCoordinator_len === 1) ?
                                (props?.domainCoordinator)?.map((cord) => {
                                    return <div style={{ textAlign: "center", color: "white" }}>
                                        <img src={cord.photoOfdomainCoordinator} className='dummyImgSingle' alt=".." />

                                        <div className='dtlsOfCoor'>
                                            <b> {cord.nameOfDomainCoordinator} </b><br></br>
                                            {cord.phoneNoOfDomainCoordinator} <br />
                                            {cord.mailOfDomainCoordinator}
                                        </div>
                                    </div>
                                }) :
                                (props?.domainCoordinator)?.map((cord) => {
                                    return <div style={{ textAlign: "center", color: "white" }}>
                                        <img src={cord.photoOfdomainCoordinator} className='dummyImgDouble' alt=".." />

                                        <div className='dtlsOfCoor'>
                                            <b> {cord.nameOfDomainCoordinator} </b><br></br>
                                            {cord.phoneNoOfDomainCoordinator} <br />
                                            {cord.mailOfDomainCoordinator}
                                        </div>
                                    </div>
                                }
                                )
                        }
                        { }

                    </div>

                </div>
            </div>
        </>
    )
}

export default EventBottom
