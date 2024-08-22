import {Link} from 'react-router-dom';

export const datasOfEvent = [
    {
        nameOfEvent: "Adhyayan",
        desc: "No problem can be solved without knowing it's root cause. This event requires the participants to do case-study, think of problems related to Innovation in agriculture and come up with upheavals. Boost your Adhyayan by participating in Adhyayan and win handsome cash prizes.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.google.com/' style={{ textDecoration: "none", color: "white" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1ixCo9NoY17-jEZ6LnoMfU5s3Levw4rO7/view?usp=sharing' style={{ textDecoration: "none", color: "white" }}>Problem Statement</a>),
        prizeMoney: "₹ 8,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [{
            img: require('../../dummy.jpg'),
            nameOfEventCoordinator: "Shubham Paliwal",
            phoneNo: (<a href="tel:6376524630" style={{ textDecoration: "none", color: "white" }}> 6376524630 </a>),
            mail: (<a href='mailto: 2040381@sliet.ac.in' style={{ textDecoration: "none", color: "white" }}> 2040381@sliet.ac.in
            </a>)
        }]
    },
    {
        nameOfEvent: "Shuruaat",
        desc: "As butterfly come out of cocoons, as Entrepreneurs in Shuruat! This events demands from the participants to present their innovations and business models pertaining to theme Innovation in Agriculture.Register yourself for the event and do a perfect Shuruat.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' style={{ textDecoration: "none", color: "white" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1t2YjsGJCfLb7ayiNE1DDNCPaWNuSBW8Y/view?usp=share_link ' style={{ textDecoration: "none", color: "white" }}>Problem Statement</a>),
        prizeMoney: "₹ 15,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [{
            img: require('../../dummy.jpg'),
            nameOfEventCoordinator: "Nishchay Sharma",
            phoneNo: (<a href="tel:9988887976" style={{ textDecoration: "none", color: "white" }}> 9988887976 </a>),
            mail: (<a href='mailto:2140394@sliet.ac.in' style={{ textDecoration: "none", color: "white" }}>2140394@sliet.ac.in</a>)
        }]
    },
    {
        nameOfEvent: "Udyam",
        desc: "How do entrepreneurs stand successful? Well, they practice on their skills of wide and critical thinking. Participate in our event and analyze where you stand in world of management and entrepreneurship.",
        register: (<Link to={"/underConstruction"} rel='noopener noreferrer' href='https://www.google.com/' style={{ textDecoration: "none", color: "white" }}>Register Now</Link>),
        schedule: (<a rel='noopener noreferrer' target='_blank' href='https://drive.google.com/file/d/1Ac38GvKaTFvgvcmH8DEBSl2PTUX7a1ih/view?usp=sharing' style={{ textDecoration: "none", color: "white" }}>Problem Statement</a>),
        prizeMoney: "₹ 8,000",
        eventMode: "hybrid",
        dateBefore: "22/03",
        coor: [{
            img: require('../../dummy.jpg'),
            nameOfEventCoordinator: "Aditya Kumar",
            phoneNo: (<a href="tel:7493995251" style={{ textDecoration: "none", color: "white" }}> 7493995251 </a>),
            mail: (<a href='mailto: 2130416@sliet.ac.in' style={{ textDecoration: "none", color: "white" }}> 2130416@sliet.ac.in</a>)
        }]
    }
]

export const datasOfEventCoordinator = [
    {
        photoOfFaculty: require('../../dummy.jpg'),
        nameOfFaculty: "Prof. Parveen Kaur Khanna, M&H",
        facultyAdvisor: "Faculty Advisor",
        domainCoordinator: [
            {
                photoOfdomainCoordinator: require('../../dummy.jpg'),
                nameOfDomainCoordinator: "Saksham Sharma",
                phoneNoOfDomainCoordinator: (<a href="tel:7976178801" style={{ textDecoration: "none", color: "white" }}> 7976178801 </a>),
                mailOfDomainCoordinator: (<a href='mailto: 2040384@sliet.ac.in' > 2040384@sliet.ac.in</a>)
            }
        ]
    }
]