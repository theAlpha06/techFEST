import {Link} from 'react-router-dom';

export const datasOfEvent = [
    {
        nameOfEvent: "Hackathon",
        desc: "Let yourself dive in the world of Programming and seize the opportunity to win handsome cash prizes.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.google.com/' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1BuWJZYlFQ6V6oiH2Vv4LcXTkzA7R0Bjl/view?usp=share_link' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Problem Statement</a>),
        prizeMoney: "₹ 20,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Sagar Guney",
                phoneNo: (<a href="tel:8112622076" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 8112622076 </a>),
                mail: (<a href='mailto:2140104@sliet.ac.in' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 2140104@sliet.ac.in
                </a>)
            }
        ]
    },
    {
        nameOfEvent: "Kritrim",
        desc: "Having ideas for betterment in agriculture? Here's an opportunity for you. Present your innovations through working/non-working models and grab the chance to win fancy prizes.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.wikipedia.com/' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1B8s2AdjVFEGn17lbR6GHHzkqZXSP-CGK/view?usp=share_link' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Problem Statement</a>),
        prizeMoney: "₹ 40,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Saksham Gupta",
                phoneNo: (<a href="tel:6232686660" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 6232686660 </a>),
                mail: (<a href='mailto:2236082@sliet.ac.in' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 2236082@sliet.ac.in
                </a>)
            },
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Pulkit Pushp",
                phoneNo: (<a href="tel:91287 69557" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 9128769557 </a>),
                mail: (<a href='mailto: 2130608@sliet.ac.in' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 2130608@sliet.ac.in
                </a>)
            },
        ]
    },
    {
        nameOfEvent: "Cod2tech",
        desc: "Pull out the tech savvy in you and present your revolutionary ideas. Participate in our event and win worth cash prizes",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.google.com/' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Register Now</Link>),
        schedule: (<a  rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1X9BppwFp-Ja6GqVK9Pdfzq4netUMA3OG/view?usp=sharing' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}>Problem Statement</a>),
        prizeMoney: "₹ 15,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [
            {
                img: require('../../dummy.jpg'),
                nameOfEventCoordinator: "Ankit",
                phoneNo: (<a href="tel:7766866193" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 7766866193 </a>),
                mail: (<a href='mailto: 2236067@sliet.ac.in' style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 2236067@sliet.ac.in
                </a>)
            }
        ]
    }
]

export const datasOfEventCoordinator = [
    {
        photoOfFaculty: require('./../../../facultyCordinatorImages/manmohan singh.jpg'),
        nameOfFaculty: "Dr. Manmohan Singh, EIE",
        facultyAdvisor: "Faculty Advisor",
        domainCoordinator: [
            {
                photoOfdomainCoordinator: require('./../../../facultyCordinatorImages/ADARSH KUMAR.jpg'),
                nameOfDomainCoordinator: "Adarsh Kumar",
                phoneNoOfDomainCoordinator: (<a href="tel:9927588504" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 9927588504
                </a>),
                mailOfDomainCoordinator: (<a href='mailto: at37057@gmail.com' style={{fontFamily: "productSans"}} > at37057@gmail.com</a>)
            },
            {
                photoOfdomainCoordinator: require('./../../../facultyCordinatorImages/aditee.jpg'),
                nameOfDomainCoordinator: " Aditee Pankaj",
                phoneNoOfDomainCoordinator: (<a href="tel:8968342101" style={{ textDecoration: "none", color: "white", fontFamily: "productSans" }}> 8968342101 </a>),
                mailOfDomainCoordinator: (<a href='mailto: 2130555@sliet.ac.in' style={{fontFamily: "productSans"}} > 2130555@sliet.ac.in</a>)
            }
        ]
    }
]