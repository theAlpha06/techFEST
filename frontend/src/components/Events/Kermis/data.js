import {Link} from 'react-router-dom';

export const datasOfEvent = [
    {
        nameOfEvent: "COD Mobile",
        desc: "Shoot yourself up for a fascinating gameplay. Call yourself off for our event COD Mobile and win amazing cash prizes.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.google.com/' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1C3u7EwjQVfLrTbgG_2-BE-IRfXD8Gi9F/view?usp=sharing' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Problem Statement</a>),
        prizeMoney: "₹ 10,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Subham Kumar",
                phoneNo: (<a href="tel:7209161853" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 7209161853 </a>),
                mail: (<a href='mailto:2040007@sliet.ac.in' style={{ textDecoration: "none", color: "white" , fontFamily: "productSans"}}> 2040007@sliet.ac.in
                </a>)
            }
        ]
    },
    {
        nameOfEvent: "Valorant Campus Stars",
        desc: "Analyze your swift and tactical abilities and see where you stand in par of opponents. Come up valiant and participate in our event Valorant to avail worthy cash prizes.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.wikipedia.com/' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1e5DKLu-jo-6J1NyREJgCj-RnuW65sdpX/view?usp=share_link' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Problem Statement</a>),
        prizeMoney: "₹ 8,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Girish Verma",
                phoneNo: (<a href="tel:9971032958" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 9971032958 </a>),
                mail: (<a href='mailto:2130757@sliet.ac.in' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 2130757@sliet.ac.in
                </a>)
            }
        ]
    },
    {
        nameOfEvent: "Checkmate",
        desc: "Amidst the black and white squares, get yourself some colourful fun by participating in our event Satranj ke Shershah and avail worthy prizes.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.google.com/' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1RopH4C8oFCOQoR0Yfq9d5Yp6_F97NetW/view?usp=sharing' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Problem Statement</a>),
        prizeMoney: "₹ 8,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Aditya Mall",
                phoneNo: (<a href="tel:8840961497" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 8840961497 </a>),
                mail: (<a href='mailto:2130725@sliet.ac.in' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 2130725@sliet.ac.in
                </a>)
            }
        ]
    }
]

export const datasOfEventCoordinator = [
    {
        photoOfFaculty: require('../../dummy.jpg'),
        nameOfFaculty: "Prof. Mandeep Singh, Maths",
        facultyAdvisor: "Faculty Advisor",
        domainCoordinator: [
            {
                photoOfdomainCoordinator: require('./../../../facultyCordinatorImages/ADITYA MALL.jpeg'),
                nameOfDomainCoordinator: "Aditya Mall",
                phoneNoOfDomainCoordinator: (<a href="tel:8840961497" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 8840961497 </a>),
                mailOfDomainCoordinator: (<a href='mailto: 2130725@sliet.ac.in' style={{fontFamily: "productSans"}} > 2130725@sliet.ac.in</a>)
            }
        ]
    }
]