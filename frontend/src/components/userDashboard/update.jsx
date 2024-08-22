import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./UserUpdate.css";
import { baseUrl } from "../../API/api";
import AuthContext from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import ErrorModel from "../ErrorPopup/ErrorModel";
import Loader from "../Loader/Loader";
function UserUpdate() {
  const authContext = useContext(AuthContext);
  const [errorMade, setErrorMade] = useState();
    const onErrorMadeHandle = () => {
        setErrorMade(null);
    };
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user/getUserById`, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((result) => {
        setIsLoading(false);
        if (
          result.status !== 200 ||
          (result.status !== 201 && result.data.isError)
        ) {
          authContext.logout();
          return result.status(208).json({
            title: "Auth Error",
            message: "Wrong user auth!",
          });
        }
        setUser(result.data.user);
      })
      .catch((err) => {
        return err.status(208).json({
          title: "Auth Error",
          message: "Wrong user auth!",
        });
      });
  }, [authContext, authContext.login]);
  // console.log(user);
  const [name, setName] = useState("");
  const [colName, setColName] = useState("");
  // const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [wphone, setWphone] = useState("");
  const [phoneErr,setPhoneErr] = useState("");
  const [fieldErr, setFieldErr] = useState(null);
  const [branchErr, setBranchErr] = useState(null);
  // const [colName,setColName] = useState("");
  const PostData = async (e) => {
    
    e.preventDefault();
    if (
      name.trim().length === 0 ||
      phone.trim().length === 0 ||
      colName.trim().length === 0 ||
      wphone.trim().length === 0 
    ) {
      setFieldErr("Field should not be empty");
      setTimeout(() => {
        setFieldErr(null);
      }, 3000);
     return;
    }
    if (branch === '0') {
      setBranchErr("Please choose your branch");
      setTimeout(() => {
        setBranchErr(null);
      }, 3000);
      return;
    }
    if (phone.length < 10 || wphone.length < 10) {
      setPhoneErr('Invalid phone number!');
      setTimeout(() => {
        setPhoneErr(null);
      }, 3000);
      return;
    }
    if (phone.length > 10 || wphone.length > 10) {
      setPhoneErr('Invalid phone number!');
      setTimeout(() => {
        setPhoneErr(null);
      }, 3000);
      return;
    }

    const update_user = {
      name: name,
      email: user.email,
      phone: Number(phone),
      whatsappPhoneNumber:wphone,
      branch: branch,
      collegeName: colName,
      // dob: dob,
    };
    setIsLoading(true);
    await axios
      .post(`${baseUrl}/user/updateuser`, update_user)
      .then((result) => {
        const res = result;
        setIsLoading(false);
        if (res.status === 400) {
          setFieldErr("Incomplete update request! Kindly try again in some time.")
          setTimeout(() => {
            navigate("/user-dashboard")
          }, 2000);
        } else if (res.status === 201) {
         setErrorMade({title: "Updated!", message: "User details updated successfully."})
        }
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log(err.response.data);
        return;
      });
  };

  return (
    
      <div className="Dashboard__body">
      {isLoading && <Loader />}
      {errorMade &&
                <ErrorModel
                    title={errorMade.title}
                    message={errorMade.message}
                    onErrorClick={onErrorMadeHandle}
                />
            }
      <div className="row_justify-content-around">
        <div className="userdashbord_body">
          <div style={{textDecoration:"underline",textAlign:"center",marginBottom:"10px"}}>Namaste!</div>
          {/* <p className="blockquote-footer">Your Unique tF ID is {user?.userId}</p>
          <p className="blockquote-footer">Your Verified mail is {user?.email}</p> */}
        </div>

        <div className="card-bodymid">
          <div className="dashboard_profile_container">
            <table className="profiletable">
              <tr>
                <td  colspan="2">
                  <b>Personal Information</b>
                </td>
                {/* <td>
                  <img
                    className="editlogo"
                    src="https://img.icons8.com/external-others-inmotus-design/1x/external-Edit-virtual-keyboard-others-inmotus-design-3.png"
                    alt=""
                  />
                </td> */}
              </tr>
              {/* <tr className="TableRow">
                <td>Profession</td>
                <td >Student</td>
              </tr> */}
              <tr className="TableRow">
              <td>Name</td>
              <td>
                  <input
                    type="text"
                    value={name}
                    autoComplete="off"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    className="TableRow__res_up "
                    name="name"
                  />
              {{ fieldErr } && <p style={{ color: "red" }}>{fieldErr}</p>}
                {/* <td>Name</td> */}

           
                </td>
              </tr>
              <tr className="TableRow">
                <td>College Name</td>

                <td>
                  <input
                    type="text"
                    value={colName}
                    autoComplete="off"
                    placeholder="Enter your college name"
                    onChange={(e) => setColName(e.target.value)}
                    className="TableRow__res_up "
                    name="name"
                  />
                </td>
              </tr>
              {branchErr && <p style={{ color: "red" }}>{branchErr}</p>}
              <tr className="TableRow ">
                <td>Branch</td>
                <td>
                  <select
                    // className={styles.signup__select}
                    className="TableRow__res_up "
                    sx={{ height: "10px" }}
                    onChange={(e) => setBranch(e.target.value)}
                    id="branch"
                    name="branch"
                    value={branch}
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
                    <option value="Ceramic Engineering">
                      Ceramic Engineering
                    </option>
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
                    <option value="Industrial Engineering">
                      Industrial Engineering
                    </option>
                    <option value="Instrumentation and Control Engineering">
                      Instrumentation and Control Engineering
                    </option>
                    <option value="Marine Engineering">
                      Marine Engineering
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Mechatronics Engineering">
                      Mechatronics Engineering
                    </option>
                    <option value="Metallurgical Engineering">
                      Metallurgical Engineering
                    </option>
                    <option value="Mining Engineering">
                      Mining Engineering
                    </option>
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
                    <option value="Textile Engineering">
                      Textile Engineering
                    </option>
                    <option value="Tool Engineering">Tool Engineering</option>
                    <option value="Transportation Engineering">
                      Transportation Engineering
                    </option>
                  </select>
                  {/* <input type="text" autoComplete="off" className="TableRow__res " name="name" /> */}
                </td>
              </tr>

              <tr className="TableRow"></tr>
              {/* <tr className="TableRow ">
                <td>Year Of Study</td>
                <td ><input type="text" autoComplete="off" className="TableRow__res " name="name" /></td>
              </tr> */}
              {/* <tr className="TableRow  ">
                <td>Date of Birth</td>
                <td>
                  <input
                  placeholder="dd-mm-yyyy"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                    type="date"
                    autoComplete="off"
                    className="TableRow__res "
                    name="name"
                  />
                </td>
              </tr> */}
              {/* <tr className="TableRow">
                <td>Photo Update</td>

                <td><input type="file" id="myFile" name="filename" className="TableRow__res "></input></td>
              </tr> */}

              {/* <!-------------------Contact Information-------------> */}

              <tr className="TableRow">
                <td className="" colspan="2">
                  <b>Contact Information</b>
                </td>
              </tr>
              {/* <tr className="TableRow">
                <td className="">E-mail </td>
                <td>
                  <input
                  placeholder=""
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                    type="text"
                    autoComplete="off"
                    className="TableRow__res "
                    name="name"
                  />
                </td>
              </tr> */}
              {phoneErr && <p style={{ color: "red", fontSize: '1rem' }}>{phoneErr}</p>}
              <tr className="TableRow">
                <td>Phone Number</td>
                <td>
                  <input
                 placeholder="Enter your Phone number"
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    autoComplete="off"
                    required
                    className="TableRow__res_up "
                    name="phone"
                  />
                </td>
              </tr>
              <tr className="TableRow">
                <td>Whatsapp Number</td>
                <td>
                  <input
                  placeholder="Enter your whatsapp number"
                  value={wphone}
                  onChange={(e) => setWphone(e.target.value)}
                    type="text"
                    autoComplete="off"
                    className="TableRow__res_up "
                    name="name"
                  />
                </td>
              </tr>
            </table>
            <button className="update_btn" onClick={PostData}>UPDATE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserUpdate;