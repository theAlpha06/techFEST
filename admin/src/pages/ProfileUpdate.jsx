import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../API/api';
// const AuthContext g
function ProfileUpdate() {
  const [coordinator, setCoordinator] = useState(null);
  const [name,setName]=useState("");
  const [phone,setPhone]=useState();
  const [branch,setBranch]=useState();
  const user_id = localStorage.getItem("coordinatorId");
  const navigate= useNavigate();
    useEffect(async () => {
        await axios.get(`${baseUrl}/coordinator/getById/${user_id}`).then((result) => {
          const res = result;
          setCoordinator(res.data.coordinator);
            setName(coordinator?.coordinatorName);
          setPhone(coordinator?.coordinatorPhone);
          setBranch(coordinator?.coordinatorBranch);
        
        });
      },[])
      // console.log(coordinator);

    const handleSubmit = (e) =>{
      
     e.preventDefault();
     const formdata =new FormData(e.target);
     const data= Object.fromEntries(formdata.entries());
    
        const email = coordinator.coordinatorEmail;
        const user= {
            coordinatorName:name,
            coordinatorPhone:phone,
            coordinatorBranch:branch,
            coordinatorEmail:email
        };
        axios.post(`${baseUrl}/coordinator/update`,user).then((res)=>{
            if(res.status===200){
                navigate("/profile")
            }
            else{
                alert("you can try again")
            }
        })
    }
  return (
    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
      <div className="ProfileWrapper" style={{width:"50%",margin:'0px auto',display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <img src="/dummy.jpg" alt="" width="200px" />
        <form onSubmit={handleSubmit}>
        <div className="profileInfo" style={{width:"90%",margin:"30px auto",textAlign:"center"}}>
            <div className="profileItem" style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"50%"}}>
                <h1>Name:</h1>
               {coordinator && ( <input type="text"  value={name}
                onChange={(e)=>setName(e.target.value)}
                name='name'
                required
                />)}
            </div>
            
            <div className="profileItem" style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"50%"}}>
                <h1>Phone:</h1>
                {coordinator && (<input type="number"  value={phone}
                // value={coordinator.coordinatorPhone}
                name='phone'
                onChange={(e)=>setPhone(e.target.value)}
                required
                />)}
            </div>
            <div className="profileItem" style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"50%"}}>
                <h1>Branch:</h1>
                {
                  coordinator && (<select
                    sx={{ height: "10px" }}
                    onChange={(e) => setBranch(e.target.value)}
                    id="branch"
                    name="branch"
                    value={branch}
                    // value={coordinator.coordinatorBranch}
                    required
                  >
                    <option value="0">Branch Enrolled</option>
                    <option value="Aeronautical Engineering">
                      Aeronautical Engineering
                    </option>
                    <option value="Aerospace Engineering">
                      Aerospace Engineering
                    </option>
                    <option value="Automobile Engineering">
                      Automobile Engineering
                    </option>
                    <option value="Biomedical Engineering">
                      Biomedical Engineering
                    </option>
                    <option value="Biotechnology Engineering">
                      Biotechnology Engineering
                    </option>
                    <option value="Ceramic Engineering">Ceramic Engineering</option>
                    <option value="Chemical Engineering">
                      Chemical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Communications Engineering">
                      Communications Engineering
                    </option>
                    <option value="Computer Science Engineering">
                      Computer Science Engineering
                    </option>
                    <option value="Construction Engineering">
                      Construction Engineering
                    </option>
                    <option value="Electrical Engineering">
                      Electrical Engineering
                    </option>
                    <option value="Electronics & Communication Engineering">
                      Electronics & Communication Engineering
                    </option>
                    <option value="Electronics Engineering">
                      Electronics Engineering
                    </option>
                    <option value="Environmental Engineering">
                      Environmental Engineering
                    </option>
                    <option value="Food Engineering and Technology">
                      Food Engineering and Technology
                    </option>
                    <option value="Instrumentation and Control Engineering">
                    Instrumentation and Control Engineering
                    </option>
                    <option value="Industrial Engineering">
                      Industrial Engineering
                    </option>
                    <option value="Marine Engineering">Marine Engineering</option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Mechatronics Engineering">
                      Mechatronics Engineering
                    </option>
                    <option value="Metallurgical Engineering">
                      Metallurgical Engineering
                    </option>
                    <option value="Mining Engineering">Mining Engineering</option>
                    <option value="Petroleum Engineering">
                      Petroleum Engineering
                    </option>
                    <option value="Power Engineering">Power Engineering</option>
                    <option value="Production Engineering">
                      Production Engineering
                    </option>
                    <option value="Robotics Engineering">
                      Robotics Engineering
                    </option>
                    <option value="Structural Engineering">
                      Structural Engineering
                    </option>
                    <option value="Telecommunication Engineering">
                      Telecommunication Engineering
                    </option>
                    <option value="Textile Engineering">Textile Engineering</option>
                    <option value="Tool Engineering">Tool Engineering</option>
                    <option value="Transportation Engineering">
                      Transportation Engineering
                    </option>
                  </select>)
                }
             
            </div>
            
        </div>
        <button style={{border:"2px solid green",padding:"5px"}} type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate;
